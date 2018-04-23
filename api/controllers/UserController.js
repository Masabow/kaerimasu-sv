/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

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

			      if (userRecord['status'] == 0) {
			    	  userRecord['status_name'] = '異常なし';
			      } else {
			    	  userRecord['status_name'] = '帰ります';
			      }
			      return res.ok(userRecord);
			    });
	}
}