This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

README
======
@author Oliver Hu

OVERVIEW
--------
This is a web app which generates a random world (represented by a 2d array), in which some cells have events, each event having at least 0 tickets available, and each ticket having a non-zero price. The app takes in a user-specified pair of coordinates and finds the five closest events, along with the cheapest ticket price for each event.

TO RUN
------
To run, simply run "npm start" from the root directory and then go to localhost:3000 in your browser.

GUI
---
The user input aspect of the user interface consists of an input box for searching coordinates (which also does error-checking), a button to find events, a button to clear results, and a button to generate a new random world. Below this, there is the actual visualization of the world, in which gray cells represent coordinates without events and red cells represent events. Once a user searches a pair of coordinates, the corresponding cell turns blue, and the cells representing the closest events turn orange. The id, lowest ticket price, and distance for each closest event are displayed below the map.

IMPLEMENTATION DETAILS
----------------------
I wrote the entire application in React. The bulk of the logic (generating the world and searching for events) occurs in the FindEvents component. The world is generated by randomly determining whether or not an event exists at each coordinate, and then generating a list of random length containing somewhat random prices for each event. The event search using a breadth-first search to find the five closest events.

The World and EventsList components exist to visualize the world and closest events, respectively.

ASSUMPTIONS
-----------
I assumed that I could establish a range on the number of tickets as well as the price range of each event. I capped the tickets at 99, as well as the price at $500. I also randomly chose about 20% of cells to have events. I chose these values arbitrarily—in a real-world implementation, we would be using actual data so I wouldn't have to set any of these ranges. A real-world implementation might actually have filters for users to restrict price range.

I also assumed that each event would keep track of the lowest ticket price—even if we were to use real data, we could hold onto the minimum price as we populate the ticket price lists. As such, displaying the minimum ticket price of each of the closest events did not require additional searching within the ticket price lists since each event already knows its lowest price. However, this might not work if prices are not fixed and can fluctuate.

EXTENSIBILITY
-------------
If this program needed to support multiple events at each location, I might consider using an Object (HashMap, Dictionary, etc.) at each coordinate, where the key is the eventId and the value is another object containing all of the event's information. An object would allow for faster lookup than a list in case that is needed down the line. The search wouldn't need to be changed much—rather than just adding a single event to the list of closest events when coming across a coordinate with events, we would just add all of the events at that coordinate.

I suppose I've already done this, but if I were working with a much larger world size, I would make sure to keep track of the minimum price of each event as the data is being pulled in, rather than iterating through the list of prices during the search to find the lowest price. If the prices are volatile and the minimum price can disappear, I might keep the ticket prices in a sorted data structure (such as a heap) so that even if the minimum is removed, we can still access the new minimum price efficiently.

A larger world size would also obviously require an updated user interface with zooming and panning so that users may view the map at the location and size they desire.






