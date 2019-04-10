import _ from 'lodash';

const navigationsData = [
  {
    "code": "0",
    "returns": [
      {
        "name": "生活",
        "brief_info": "brief_info",
        "navlogo_url": "navlogo_url",
        "created_date": "created_date",
      },
      {
        "name": "生活1",
        "brief_info": "brief_info",
        "navlogo_url": "navlogo_url",
        "created_date": "created_date",
      },
      {
        "name": "生活2",
        "brief_info": "brief_info",
        "navlogo_url": "navlogo_url",
        "created_date": "created_date",
      },
    ],
    "err": {}
  },
  {
    "code": "-1",
    "returns": [],
    "err": {
      "errno": "1000001",
      "errmsg": "未知错误",
      "errdetail": "模块XYZ：未知错误"
    }
  },
  {
    "code": "5000",
    "returns": [],
    "err": {
      "errno": "5000000",
      "errmsg": "参数错误",
      "errdetail": "模块XYZ：参数错误"
    }
  },
];

export function mockNavigations() {
  return _.sample(navigationsData);
};

const navigationTypesData = [
  {
    "code": "0",
    "returns": [
      {
        "name": "生活",
      },
      {
        "name": "技术",
      },
      {
        "name": "其他",
      },
    ],
    "err": {}
  },
  {
    "code": "-1",
    "returns": [],
    "err": {
      "errno": "1000001",
      "errmsg": "未知错误",
      "errdetail": "模块XYZ：未知错误"
    }
  },
  {
    "code": "5000",
    "returns": [],
    "err": {
      "errno": "5000000",
      "errmsg": "参数错误",
      "errdetail": "模块XYZ：参数错误"
    }
  },
];

export function mockNavigationTypes() {
  return _.sample(navigationTypesData);
};
