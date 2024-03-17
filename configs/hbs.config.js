const hbs = require('hbs');
const { options } = require('./routes.config');

hbs.registerPartials(`${__dirname}/../views/partials`);


/*
hbs.registerHelper('isFollowedBy', function (resource, currentUser, options) {
    return currentUser.yourChannels.filter((channel) => (resource._id == channel));
});

hbs.registerHelper('isFollowed', function (channel, currentUser, options) {
    const isFollowed = currentUser.yourChannels.some((UserChannel) => UserChannel.toString() === channel._id.toString())

    if (isFollowed)  {
        return new hbs.SafeString('<form class="col-4" action="/channel/{{channel.id}}" method="POST"><div><button class="btn btn-outline-light" style="width:100%">Unfollow this channel</button></div></form>')
    } else {
        return new hbs.SafeString('<form class="col-4" action="/channel/{{channel.id}}" method="POST"><div><button class="btn btn-primary" style="width:100%">Follow this channel</button></div></form>')
    }
})
*/