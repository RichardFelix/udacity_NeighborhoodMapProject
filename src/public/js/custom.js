'use strict';

//////////////////////////////
//         Model            //
//////////////////////////////
var locations = [
    {
      "name": "Empire State Building",
      "lat" : 40.7194689,
      "log" : -74.0316709,
      "info": "The Empire State Building is a 102-storty skyscraper located in Midtown Manhattan, New York City, on Fifth Avenue between West 33rd and 34th Streets."
    },
    {
      "name": "Statue of Liberty",
      "lat" : 40.6892534,
      "log" : -74.0466891,
      "info": "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor in New York City, in the United States."
    },
    {
      "name": "Times Square",
      "lat" : 40.758899,
      "log" : -73.9873197,
      "info": "Times Square is a major commercial intersection and neighborhood in Midtown Manhattan, New York City, at the junction of Broadway and Seventh Avenue, and stretching from West 42nd to West 47th Streets."
    },
    {
      "name": "The Museum of Modern Art",
      "lat" : 40.7614367,
      "log" : -73.9798103,
      "info": "The Museum of Modern Art (MoMA) is an art museum located in Midtown Manhattan in New York City, on 53rd Street between Fifth and Sixth Avenues. It has been important in developing and collecting modernist art, and is often identified as the most influential museum of modern art in the world."
    },
    {
      "name": "Ellis Island Immigration Museum",
      "lat" : 40.6977041,
      "log" : 74.0391417,
      "info": "Ellis Island, in Upper New York Bay, was the gateway for over 12 million immigrants to the United States as the nation's busiest immigrant inspection station from 1892 until 1954."
    },
    {
      "name": "American Museum of Natural History",
      "lat" : 40.7813281,
      "log" : 73.9761769,
      "info": "The American Museum of Natural History, located on the Upper West Side of Manhattan, New York City, is one of the largest museums in the world. Located in park-like grounds across the street from Central Park, the museum complex comprises 27 interconnected buildings housing 45 permanent exhibition halls, in addition to a planetarium and a library. "
    },
    {
      "name": "Metropolitan Museum of Art",
      "lat" : 40.7794406,
      "log" : -73.9654327,
      "info": "The Metropolitan Museum of Art, colloquially, is located in New York City and is the largest art museum in the United States, and among the most visited art museums in the world."
    },
    {
      "name": "Grand Central Terminal",
      "lat" : 40.7527302,
      "log" : -73.9794181,
      "info": "Grand Central Terminal is a commuter, rapid transit railroad terminal at 42nd Street and Park Avenue in Midtown Manhattan in New York City, United States."
    },
    {
      "name": "Central Park",
      "lat" : 40.7828687,
      "log" : -73.9675438,
      "info": "Central Park is an urban park in middle-upper Manhattan, within New York City. Central Park is the most visited urban park in the United States, with 40 million visitors in 2013. It is also one of the most filmed locations in the world."
    },
    {
      "name": "Rockefeller Center",
      "lat" : 40.7587442,
      "log" : -73.9808623,
      "info": "Rockefeller Center is a complex of 19 commercial buildings covering 22 acres between 48th and 51st Streets in New York City."
    }
]

//////////////////////////////
//     Place Object         //
//////////////////////////////
var Place = function Place(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.log = ko.observable(data.log);
  this.info = ko.observable(data.info);
  this.visibleBool = ko.observable(true);
  this.visibleInfo = ko.observable(false);
};

//////////////////////////////
//       View Model         //
//////////////////////////////
var ViewModel = function ViewModel() {
  var self = this,
      locationLength = locations.length;

  // add all locations to a ko array
  self.locationList = ko.observableArray([]);
  for(var x = 0; x < locationLength; x++) {
    self.locationList.push( new Place(locations[x]) );
  }

  // show infomation on Click of li also hide infomation if clicked li that
  // is already shown.
  self.showInfo = function(name) {
    var position = self.getLocationListObject(name());

    if(self.locationList()[position].visibleInfo()){
      self.locationList()[position].visibleInfo(false);
    }else{
      self.locationList()[position].visibleInfo(true);
    }
  };

  // figure out locationList object
  self.getLocationListObject = function(name) {
    for(var x = 0; x < locationLength; x++) {
      if(self.locationList()[x].name() === name) {
        return x;
      }
    }
  };

  // filter visible list items
  self.filter = function() {
    var inputLength = self.input().length,
        inputLowerCase = self.input().toLowerCase().substring(0,inputLength);

    // first lowercase all letters in locationList array item and user input from
    // text box.  Then see if both match if so show those items.  Otherwise turn visability
    // off for that item.  And if input is empty retun all items back to list.
    for(var x = 0; x < locationLength; x++) {
      var nameLowerCase = self.locationList()[x].name(),
          nameLowerCase = nameLowerCase.toLowerCase().substring(0,inputLength);

      if(inputLowerCase !== nameLowerCase) {
        self.locationList()[x].visibleBool(false);
      }else{
        self.locationList()[x].visibleBool(true);
      }
    }
  };

  // text value start
  self.input = ko.observable('');
};

ko.applyBindings(new ViewModel());
