1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans : getElementById select single elements by id 
      getElementsByClassName select single elements by class 
     
      querySelector returns first matching css element 
      querySelectorAll  returns all matching css elements 
       
      so, getElementById  is faster than  getElementsByClassName
      and querySelector  than querySelectorAll in terms of single element access.

2. How do you create and insert a new element into the DOM?

Ans : First create new element by createElement('tag') then modify this
      element according to needed things like css ,textcontent,
      Then append to parent using appenChild(element)

3. What is Event Bubbling? And how does it work?

Ans : When an element is clicked then it get targeted or its scope    
      get targeted then its moves upward to its parent or grandparents .


### <div id="grandparent">               3rd hit
###  <div id="parent">                  2nd hit
###    <button>Click Me</button>        1st hit (target)
###   </div>
###  </div> 

4. What is Event Delegation in JavaScript? Why is it useful?

Ans : Instead of adding a listener to every child adding  one listener   to the parent and bubbling do the rest of the work for
child listener

It helps to manage the code reduce using same code make effcient 
uses of eventlistener.

5. What is the difference between preventDefault() and stopPropagation() methods?

Ans : preventDefault() — stops the browser's default behavior, but the event still bubbles normally.

On the other hand stopPropagation() — stops the event from bubbling up to parents, but the default behavior still executes

