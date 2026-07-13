class Message {

    constructor(_id, _senderid, _receiverid, _content) {
        this.id = _id;
        this.senderid = _senderid;
        this.receiverid = _receiverid;
        this.content = _content;
        this.sentAt = new Date();
        this.isRead = false;
    }

}
module.exports = Message;
