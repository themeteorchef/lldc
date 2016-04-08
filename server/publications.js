// Meteor.publish( 'biosListPub', function( limit ) {
//   return Bios.find( {}, { limit: limit, sort: { order: 1 } } );
// });

Meteor.publish( 'biosListPub', function( search, limit ) {
  let query      = {},
      projection = { limit: limit, sort: { order: 1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { name: regex },
        { order: regex }
      ]
    };
  }

  return Bios.find( query, projection );
});
