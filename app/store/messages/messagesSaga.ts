import { all, put, takeEvery } from "redux-saga/effects";

import { getReply } from "../../utils/getReply";
import { setMessages, sendMessage, setIsTyping } from "./messagesSlice";

// Our worker Sagas
function* sendMessageStart({ payload: message }) {
  yield put({ type: setIsTyping, payload: true });
  yield put({ type: setMessages, payload: message });
  const replyMessages = yield getReply(message);
  yield put({ type: setMessages, payload: replyMessages });
  yield put({ type: setIsTyping, payload: false });
}

// Our watcher Sagas
function* watchSendMessage() {
  yield takeEvery(sendMessage, sendMessageStart);
}

// Combine watcher Sagas (only needed if more than one)
function* messagesSaga() {
  yield all([watchSendMessage()]);
}

export { messagesSaga };
