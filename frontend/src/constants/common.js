export const BUTTON_TYPES = {
  blue: { className: "ct-button-blue" },
  gray: { className: "ct-button-gray" },
};

export const DEFAULT_ITEM_PER_PAGE = 20;

export const BIRTHYEAR_OPTIONS = (function () {
  let fromYear = 1900;
  let toYear = 2010;
  let result = [];
  for (let i = fromYear; i <= toYear; i++) {
    result.push({
      key: i,
      label: `${i}年`,
    });
  }
  return result;
})();

export const SEXS = [
  {
    key: 1,
    label: "男性",
  },
  {
    key: 2,
    label: "女性",
  },
];

export const TODAY_INFO = {
  key: 1,
  label: "日会",
};
export const WEEK_INFO = {
  key: 2,
  label: "7日平均",
};
export const MONTH_INFO = {
  key: 3,
  label: "30日平均",
};
export const SEMIANUAL_INFO = {
  key: 4,
  label: "半年間",
};

export const CALENDARS = [TODAY_INFO, WEEK_INFO, MONTH_INFO];

export const CALENDARS_WITHOUT_TODAY = [WEEK_INFO, MONTH_INFO, SEMIANUAL_INFO];

export const TODAY = TODAY_INFO.key;
export const WEEK = WEEK_INFO.key;
export const MONTH = MONTH_INFO.key;
export const SEMIANUAL = SEMIANUAL_INFO.key;

export const UP = 1;
export const DOWN = 2;

export const STATUS_UNAUTHORIZED = 401;

export const EDIT = "EDIT";
export const PREVIEW = "PREVIEW";
