# Notes on parsing commands


## Combinations
---

### Push/Pull/Move/Attack/Hit/Open/Close/Cover/Break/Cut
parse as `[verb, target, prep, object]`
preps: `[with]`
priorites: 
1. World & Item
2. World & World

### Examine
parse as `[verb, target, prep, object]`
preps: `[with]`
1. Inventory & Inventory
2. World & Inventory

### Combine
parse as `[verb, object, prep, target]`
preps: `[with]`
3. Inventory & Inventory
4. Inventory & World

### Replace
parse as `[verb, object, prep, object]`
preps: `[with]`
1. World & Inventory
2. Inventory & World ?? dunno

### Use
parse as `[verb, object, prep, target]`
preps: `[with, on]`
1. Inventory & Inventory
2. Inventory & World Object


Actions on world
_____________________________________________________

### Throw
parse as `[verb, obj, prep, target]`
preps: `[in, on, into, onto, at, agaianst]`
1. World & Item
2. World & World

### Put/Place/Drop
parse as `[verb, obj, prep, target]`
preps: `[on, onto, in, into, under, over, inside]`
1. World & Item
2. World & World
3. Item & Item

### Remove
parse as `[remove, obj, prep, target]`
preps: `[from]`
result: TBA
1. World & World
2. ItemPart & Item - i.e remove the eye from statue.
3. Item & World - i.e pick back up item.
  


Advanced Character Interactions
_____________________________________________________


### Show
parse: `[verb, object, prep, character]`
preps: `[to]`
1. Item, Character
2. World, Character `i.e Show hidden entrance to character`

### Ask
parse: `[verb, character, prep, object]`
preps: `[about]`
1. Character, Journal Item - Could be visible or hidden. I.e Displayed in journal, or somthing more like a hidden door.
2. Character, Item
3. Character, World

### Tell
parse: `[verb, character, prep, object]`
preps: `[about]`
1. Character, Journal Item
2. Character, World



## Actions
---

### Wait
parse: `[wait, timeX]`
preps: `[for]`
remove for - Parse time to turn counter
result: Increment turn counter - reload scene

### Pick Up/Get/Take
parse: `[take, item]`
1. Inventory
result: if item & take conditions - item is removed from scene
and added to inventory.

### Drop/Discard
1. Inventory
result: if item is droppable - item is removed from inventory
potential: on Discard text - default "You drop the `itemName`"
and added with a description stub to scene.
parse: `[drop, item]`


## Global Concepts

---

### Game State Data

**Default Progress Info**: hasVisited(sceneId), turnIs([x,<,<=,>,>=]), 
These casn be referecnced - or custom conditions can be defined that group together default progress info and custom progress variables. 

**Custom Progress Info**: Includes custom flags and variables which can be toggled/set/incremented/decremented to decide which conditions are met.

**Journal Entries/Player Knowledge**: Named information that be displayed back to player - also used
to keep track of what a character can ask and tell npcs.
Can be hidden from user. 
i.e You notice a strange bird in a scene and in another a character tells you they are an expert in birds. In this case a hidden journal entry would act as a kind of player knowledge. 
This is different from a silent progress condition - as it is Named formally and contain information to display back to a user - i.e know how to understand conversation interactions. 

**Inventory**: Items the character has picked up, can be added by condition or as the result of a get action. Player may also start with items.

**SceneHistory**: Array of scenes visited in order of visit. 

**TurnCounter**: Actions taken in a game - this can corrospond to a cycle which is toggled between 20 turns. i.e day and night. 

1. Any command can trigger an event - i.e addCondition, destroyItem, addItem, showText
2. Any event can be attached to a condition [addCondition, unlessExists]
3. Any command can be executed infinatly unless limited. 
4. Any command can display different condition based on a repeated input.
   
5. Items can be drobbable into scene. If you want to have something disapear then
   drop conditions would be [destroySelf, displayText]

6. Items that can be picked up multiple times yet display as a single inventory item
   i.e pile of mud - on pickup events would include [displayText, [addItem ,unlessExists]]


