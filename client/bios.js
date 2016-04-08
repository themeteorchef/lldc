import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// import './main.html';

Template.bios.onCreated( function() {
  let handle,
      template = Template.instance();

  template.searchQuery = new ReactiveVar();
  template.searching   = new ReactiveVar( false );

  template.autorun( function() {
    // handle = Meteor.subscribeWithPagination( 'biosListPub', template.searchQuery.get(), 50 );

    handle = Meteor.subscribeWithPagination( 'biosListPub', template.searchQuery.get(), 50, () => {
      setTimeout( () => {
        template.searching.set( false );
      }, 300 );
    });
  });

  window.onscroll = function( event ) {
    if ( ( window.innerHeight + window.scrollY ) >= document.body.offsetHeight ) {
      handle.loadNextPage();
    }
  }
});

Template.bios.helpers({
  biosList() {
    return Bios.find();
  },
  searching() {
    return Template.instance().searching.get();
  }
});

Template.bios.events({
  'keyup [name="search"]' ( event, template ) {
    let value = event.target.value.trim();

    if ( value !== '' && event.keyCode === 13 ) {
      template.searchQuery.set( value );
      template.searching.set( true );
    }

    if ( value === '' ) {
      template.searchQuery.set( value );
    }
  }
});
