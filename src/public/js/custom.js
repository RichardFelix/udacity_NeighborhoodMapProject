'use strict';

//////////////////////////////
//         Model            //
//////////////////////////////
var locations = [
    {
      "name": "John",
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": 'Smith',
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": "Matty",
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": "Prince",
      "lat" : 123,
      "log" : 5595
    },
    {
      "name": "Jewel",
      "lat" : 123,
      "log" : 5595
    }
]

//////////////////////////////
//     Place Object         //
//////////////////////////////
var Place = function Place(data) {
  this.name = ko.observable(data.name);
  this.lat = ko.observable(data.lat);
  this.log = ko.observable(data.log);
  this.visibleBool = ko.observable(true);
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

      if(inputLowerCase === nameLowerCase && inputLowerCase !== '') {
        self.locationList()[x].visibleBool(true);

      }else if(inputLowerCase === '') {
        self.locationList()[x].visibleBool(true);

      }else{
        self.locationList()[x].visibleBool(false);
      }
    }
  };

  // text value start
  self.input = ko.observable('');
};

ko.applyBindings(new ViewModel());
