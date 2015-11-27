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
    $('.fight-item').each(function() {
     
     var currentFight = fights.fightNumber; //this doesnt work, needs to be changed  
     var selectedEvent = Session.get('selectedEvents'); //dropdown selection, need to change (saves the _id not the event name)
     var fighterChoice = $('input[name="winner"]:checked').val()
     var finishChoice = $('input[name="finish"]:checked').val();
     var rdChoice = $('input[name="rd"]:checked').val();
     
     Picks.insert({
       user_ID:user, 
       event:selectedEvent, 
       fightNumber:currentFight, 
       fighter:fighterChoice, 
       finish:finishChoice, 
       round:rdChoice
       });   
     });
     alert("Your picks have been saved!");
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
