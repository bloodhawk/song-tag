song-tag
========

A mini project to practice validation, relationships in Mongo, populate.

##Objectives
You'll create a simple set of schema revolving around Artists, their Songs, and a set of Tags that are associated with songs.

##Step 1: Create Schema

Here are the models we'll create in Mongoose:

####Artist
 * name (string)
 * bio (string)
 * genres (array of unique strings)

####Song
 * name (string)
 * album (string)
 * genre (string)
 * releasedOn (date)
 * isExplicit (boolean)

####Tag
 * name (string, unique)

Create each of the models listed above. Put them each in their own file in a `/lib/models` directory. Make sure you use `module.exports` so that we can `require` these models in our API.

Now, let's connect these models. 

* Use a one-to-many relationship for Artist -> Song
* Use a many-to-many relationship for Song -> Tag

This should necessitate adding fields to our models to represent these relationships:

####Artist
* songs

####Song
* artist
* tags

####Tag
* songs

##Step 2: Complete Angular
