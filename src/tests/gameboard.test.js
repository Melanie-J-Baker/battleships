// 2. Create Gameboard factory. 
// a) Note that we have not yet created any User Interface. We should know our code is coming together by running the tests. You shouldnt be relying on console.log or DOM methods to make sure your code is working. 
// b) Gameboards should be able to place ships at specific coordinates by calling the ship factory function. 
// c) Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the hit function to the correct ship, or records the coordinates of the missed shot. 
// d) Gameboards should keep track of missed attacks so they can display them properly. 
// e) Gameboards should be able to report whether or not all of their ships have been sunk.