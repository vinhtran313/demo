const { Silmee } = require('./models');
const { readVital } = require('./services/silmee_service');
const { moment, chunkArray } = require('./utils');
const { batchWriteItem } = require('./services/dynamodb');

async function getUserSilmeeData(silmee, page = 1, defaultTs, defaultTe) {
  const ts = defaultTs ? defaultTs : (silmee.lastCloneTime ? moment(silmee.lastCloneTime).unix() : moment(silmee.insertTime).unix())
  const te = defaultTe ? defaultTe: moment().unix();
  const deviceUser = silmee.deviceUser;
  try {
    const { data_list, next } = await readVital({ ts, te, deviceUser, page });
    const dataList = [];
    const timestamps = [];
    data_list.forEach(item => {
      const timestamp = moment(item.timestamp * 1000).format('YYYY-MM-DD HH:mm:ss');
      if (!timestamps.includes(timestamp)) {
        timestamps.push(timestamp);
        dataList.push({
          userID: silmee.userID,
          ts: timestamp,
          upload_time: moment(item.upload_time * 1000).format('YYYY-MM-DD HH:mm:ss'),
          steps: item.steps,
          energy_expenditure: item.energy_expenditure,
          act_type: item.act_type,
          sleep_est: item.sleep_est,
          sleep_state: item.sleep_state,
          motion_freq: item.motion_freq,
          skin_temp: item.skin_temp,
          hr: item.hr,
          uv: item.uv,
          talk: item.talk,
        });
      } else {
        console.log('Duplicate timestamp:', timestamp);
      }
    });
    const chunks = chunkArray(dataList, 25);
    await Promise.all(chunks.map(items => {
      return batchWriteItem({
        tableName: process.env.DYNAMODB_ONE_MINUTE_DATA_TABLE,
        items,
      })
    }));
    await silmee.update({
      lastCloneTime: moment(te * 1000).format('YYYY-MM-DD HH:mm:ss'),
    });
    if (next) {
      await getUserSilmeeData(silmee, page + 1, ts, te);
    }
  } catch (error) {
    console.log('getUserSilmeeData error:', error);
  }
}

async function cloneData() {
  const silmees = await Silmee.findAll();
  await Promise.all(silmees.map((silmee) => getUserSilmeeData(silmee)))
}


module.exports = { cloneData };

exports.runCronJob = async () => {
  await cloneData();
  return {};
}
