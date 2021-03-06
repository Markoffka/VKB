const {
  pope: format
} = require('pope')
const GetUserName = require('./getUserName');
module.exports = async (answer, ctx, next, bot) => {
  let options = {
    answer,
    ctx,
    next
  }
  let toSend = answer.fulfillment.speech;
  let raw_data = {
    bot_name: 'Auda',
    user: {
      first_name: 'User',
      last_name: 'UserLastName'
    }
  }
  let DialogflowAnswer = answer.fulfillment.speech;
  let FormatData = {};
  let Message = "";

  GetUserName(ctx, bot).then(user_data => {
    try {
      let script = require(`./dialogflow_commands/${answer.action}.js`)
      script(options).then(data => {
        if (data) Object.assign(raw_data, data)
      })
    } catch (e) {} finally {
      Object.assign(FormatData,
        raw_data, {
          user: user_data
        });
      Message = format(DialogflowAnswer, FormatData);
      ctx.send(Message);
    }
  });


}