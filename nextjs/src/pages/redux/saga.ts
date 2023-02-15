import axios from "axios";
import { all, call, takeEvery, put, takeLatest } from "redux-saga/effects";
import { notification } from "antd";
import {
  actionTypes,
  getalltodoRequest,
  setSizeData,
  todolistData,
} from "./action";

const getalltodoApi = async (data: any) => {
  http: return await axios.get(
    `http://localhost:4000/list-users?filter={"limit": ${
      data.pagesize
    }, "skip": ${(data.page - 1) * data.pagesize}}`
  );
};

function* getalltodoSaga({ payload }: any): any {
  const { pages, pagesizes } = payload;
  let page = pages ? pages : 1;
  let pagesize = pagesizes ? pagesizes : 5;
  const res = yield call(getalltodoApi, { page, pagesize });
  if (res.data) {
    yield put(todolistData(res.data));
    yield put(setSizeData(res.data.length));
  } else {
    notification.open({
      message: res.data.status,
    });
  }
}
const findApi = async (data: any) => {
  return await axios.get(
    ` http://localhost:4000/list-users?filter={ "where": { "username": {"like": ${
      data.search
    }} }   "limit":  ${data.pagesize}, "skip":${
      (data.page - 1) * data.pagesize
    } }`
  );
};

function* findSaga({ payload }: any): any {
  const { search, role, page, pagesize } = payload;
  console.log(search, role);
  const res = yield call(findApi, { search, role, page, pagesize });
  if (res.data) {
    console.log(res.data);
    yield put(setSizeData(res.data.length));
    yield put(todolistData(res.data));
  }
}

const postApiLogin = async (data: any) => {
  return await axios.post("http://localhost:4000/users/login", data);
};

const postApiRegister = async (data: any) => {
  return await axios.post("http://localhost:4000/signup", data);
};

function* loginSaga({ payload }: any): any {
  const { email, password, callback } = payload;
  const res = yield call(postApiLogin, { email, password });
  
  if (res) {
    notification.open({
      message: "success",
    });
    yield call(callback);
  } else {
    notification.open({
      message: "error",
    });
  }
}

function* registerSaga({ payload }: any): any {
  const { email, password, username, callback } = payload;
  const res = yield call(postApiRegister, { email, password, username });
  console.log(80, res);
  if (res) {
    yield call(callback());
    notification.open({
      message: res.data.status,
    });
  } else {
    notification.open({
      message: res.data.status,
    });
  }
}

const deleteApi = async (data: any) => {
  return await axios.delete(`http://localhost:4000/list-users/${data.id}`);
};

function* deleteSaga({ payload }: any): any {
  const { _ID } = payload;
  const res = yield call(deleteApi, { id: _ID });
  if (res) {
    yield put(getalltodoRequest(false));
    notification.open({
      message: res.data.status,
    });
  } else {
    notification.open({
      message: res.data.status,
    });
  }
}

const addApi = async (data: any) => {
  console.log(data);
  return await axios.post("http://localhost:4000/list-users", data);
};
const putApi = async (data: any) => {
  console.log(160, data);

  return await axios.put(` http://localhost:4000/list-users/${data.id}`, data);
};

function* changeSaga({ payload }: any): any {
  const { id, username, role, address, birthday } = payload;
  const res = yield call(putApi, { id: id, username, role, birthday, address });
  // console.log(168, res);
  if (res) {
    yield put(getalltodoRequest(true));
    notification.open({
      message: res.data.status,
    });
  }
}

function* addSaga({ payload }: any): any {
  const { username, birthday, role, address } = payload;
  const res = yield call(addApi, { username, birthday, role, address });
  if (res) {
    notification.open({
      message: res.data.status,
    });
    yield put(getalltodoRequest(false));
  } else {
    notification.open({
      message: res.data.status,
    });
  }
}

function* rootSaga(): any {
  yield all([
    yield takeLatest(actionTypes.FILTER_REQUEST, findSaga),
    yield takeEvery(actionTypes.LOGIN_REQUEST, loginSaga),
    yield takeLatest(actionTypes.REGISTER_REQUEST, registerSaga),
    yield takeLatest(actionTypes.DELETE_REQUEST, deleteSaga),
    yield takeLatest(actionTypes.ADD_REQUEST, addSaga),
    yield takeLatest(actionTypes.GETALLTODO_REQUEST, getalltodoSaga),
    yield takeLatest(actionTypes.CHANGE_REQUSET, changeSaga),
  ]);
}

export default rootSaga;
