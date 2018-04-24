/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
require('date-utils');
module.exports = {
	findOne: function (req, res) {
		User.findOne({ id: 1 })
		   .exec(function(err, userRecord) {
			      if (err) {
			        switch (err.name) {
			          case 'UsageError': return res.badRequest(err);
			          default: return res.serverError(err);
			        }
			      }

			      if (!userRecord) { return res.notFound(); }

			      if (req.isSocket) {
			        User.subscribe(req, [user.id]);
			      }
			      userRecord['status_name'] = '状態:';
			      if (userRecord['status'] == 0) {
			    	  userRecord['status_name'] += '異常なし';
			      } else {
			    	  userRecord['status_name'] += '帰ります';
			      }
			      var updateMs = userRecord['updatedAt'];
			      var sec = userRecord['duration']['value'];
			      var date = new Date(updateMs);
			      userRecord['update_time'] = new Date(date).toFormat("YYYY/MM/DD HH24:MI:SS");
			      date.setTime(date.getTime() + sec* 1000);
			      userRecord['dist_time'] = date;
			      userRecord['format_time'] = 'Arrive:' + date.toFormat("YYYY/MM/DD HH24:MI:SS");
			      return res.ok(userRecord);
			    });
	}
}