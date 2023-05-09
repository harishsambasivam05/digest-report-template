const { CourierClient } = require("@trycourier/courier");

class Courier {
  constructor(authToken) {
    this.client = CourierClient({ authorizationToken: authToken });
  }

  async sendMail(to, templateId, variables) {
    console.log({
      message: {
        to: {
          email: to,
        },
        template: templateId,
        data: variables,
      },
    });

    const { requestId } = await this.client.send({
      message: {
        to: {
          email: to,
        },
        template: templateId,
        data: variables,
      },
    });
    return { requestId };
  }
}

module.exports = {
  Courier,
};
