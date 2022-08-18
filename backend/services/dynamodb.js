const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID || 'AKIA2OB46DIATLUVSW4K',
  secretAccessKey: process.env.SECRET_ACCESS_KEY || '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',
  region: process.env.REGION || 'ap-northeast-1'
});

const docClient = new AWS.DynamoDB.DocumentClient();
const dynamodb = new AWS.DynamoDB();

function createTable(params) {
  return dynamodb.createTable(params).promise()
}

function deleteTable(TableName) {
  return dynamodb.deleteTable({ TableName }).promise()
}

function batchWriteItem({
  tableName,
  items
}) {
  const data = items.map(item => ({
    PutRequest: {
      Item: item
    }
  }));
  return docClient.batchWrite({
    RequestItems: {
      [tableName]: data
    }
  }).promise();
}

function putItem({
  TableName,
  Item
}) {
  return docClient.put({
    TableName,
    Item,
    ConditionExpression: "attribute_not_exists(pk)",
  }).promise();
}

function addItemtoArray({
  TableName,
  listName,
  Key,
  item
}) {
  return docClient.update({
    TableName,
    Key,
    ReturnValues: 'ALL_NEW',
    UpdateExpression: `set #${listName} = list_append(if_not_exists(#${listName}, :empty_list), :item)`,
    ExpressionAttributeNames: {
      [`#${listName}`]: `${listName}`
    },
    ExpressionAttributeValues: {
      ':item': [item],
      ':empty_list': []
    }
  }).promise();
}

function queryData(params) {
  return docClient.query(params).promise();
}

module.exports = {
  addItemtoArray, queryData, batchWriteItem, putItem, createTable, deleteTable
};
