//add Collections
Results = new Mongo.Collection('results');
Events = new Mongo.Collection('events');
Picks = new Mongo.Collection('picks');

if (Meteor.isClient) {

//Tells the console when the selected event changes and
//shows the _id of the selection  
Tracker.autorun(function () {
  console.log('The selectedEvent ID is: ' +
    Session.get('selectedEvents')
  );
});  
  
var user = "John"; //Just for testing purposes, will be replaced with actual user

//get list of events to pick from (from Events Collection)
//save selection in Session object
Template.main.helpers({
  events: function () {
    return Events.find({}, {
      fields: {
        event: 1,
        _id: 1
      }
    });
  },
  isSelected: function () {
    return Session.equals('selectedEvents', this._id) ? 'selected' : '';
  }
});
//if they change the selection update the Session object
Template.main.events = {
  'change #eventSelection': function (evt) {
    Session.set('selectedEvents', evt.currentTarget.value);
  }
};

//connect template to selected event  
Template.pickArea.helpers({
  event: function () {
    return Events.findOne({
      _id: Session.get('selectedEvents')
    });
  }
});

/*event listener for save button loops through list items
 and saves the selections to the picks collection */
Template.pickArea.events({
  'click #save-button': function (event, template) {
      
     var selectedEvent = Session.get('selectedEvents'); //dropdown selection, need to change (saves the _id not the event name)
     
     Picks.insert({
       user_ID:user, 
       event:selectedEvent,
       fights:[
      { 
       fightNumber:1,
       fighter:$('input[name="winner1"]:checked').val(), 
       finish:$('input[name="finish1"]:checked').val(), 
       round:$('input[name="rd1"]:checked').val()
      },
      { 
       fightNumber:2,
       fighter:$('input[name="winner2"]:checked').val(), 
       finish:$('input[name="finish2"]:checked').val(), 
       round:$('input[name="rd2"]:checked').val() 
      },
      { 
       fightNumber:3,
       fighter:$('input[name="winner3"]:checked').val(), 
       finish:$('input[name="finish3"]:checked').val(), 
       round:$('input[name="rd3"]:checked').val()
      },
      { 
       fightNumber:4,
       fighter:$('input[name="winner4"]:checked').val(), 
       finish:$('input[name="finish4"]:checked').val(), 
       round:$('input[name="rd4"]:checked').val()
      },
      {  
       fightNumber:5,
       fighter:$('input[name="winner5"]:checked').val(), 
       finish:$('input[name="finish5"]:checked').val(), 
       round:$('input[name="rd5"]:checked').val()
      }
      ]
     });   
     alert("Your picks have been saved!");
     $('input[type=radio]').attr('checked',false);
  }
});

/*gets the round value for this fight, and compares it
to the argument given in the block helper and returns
 true or false  */
Template.fightData.helpers({
  roundNum: function (rounds) {
    return this.rounds === rounds;
  }
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    
    //Empty the database and fill it with Test data
    Events.remove({});
    Picks.remove({});
    
    Events.insert({
      event: 'UFC 193',
      fights:[
        {
        fightNumber:1,
        fighter1: 'Stefan Struve',
        fighter2: 'Jared Rosholt',
        rounds: 3
      },
      {
        fightNumber:2,
        fighter1: 'Uriah Hall',
        fighter2: 'Robert Whittaker',
        rounds: 3
      },
      {
        fightNumber:3,
        fighter1: 'Mark Hunt',
        fighter2: 'Antonio Silva',
        rounds: 3
      },
      {
        fightNumber:4,
        fighter1: 'Joanna Jedrzejczyk',
        fighter2: 'Valerie Letourneau',
        rounds: 5
      },
      {
        fightNumber:5,
        fighter1: 'Ronda Rousey',
        fighter2: 'Holly Holm',
        rounds: 5
      }
      ]  
    });
    
    Events.insert({
      event: 'UFC 194',
      fights:[
        {
        fightNumber:1,
        fighter1: 'Max Holloway',
        fighter2: 'Jeremy Stephens',
        rounds: 3
      },
      {
        fightNumber:2,
        fighter1: 'Demian Maia',
        fighter2: 'Gunnar Nelson',
        rounds: 3
      },
      {
        fightNumber:3,
        fighter1: 'Ronaldo Souza',
        fighter2: 'Yoel Romero',
        rounds: 3
      },
      {
        fightNumber:4,
        fighter1: 'Chris Weidman',
        fighter2: 'Luke Rockhold',
        rounds: 5
      },
      {
        fightNumber:5,
        fighter1: 'Jose Aldo',
        fighter2: 'Conor Mcgregor',
        rounds: 5
      }
      ]  
    });
    
  });
}
