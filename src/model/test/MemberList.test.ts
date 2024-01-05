


// import MemberList from "../MemberList";

// var localStorageMock = (function() {
//   var store = {};

//   return {
//     getItem: function(key) {
//         return store[key] || null;
//     },
//     setItem: function(key, value) {
//         store[key] = value.toString();
//     },
//     clear: function() {
//         store = {};
//     }
//   }; 
// })();

// Object.defineProperty(window, 'localStorage', {
//  value: localStorageMock
// });


// test('load member list', () => {
//   const memberListInstance:MemberList = new MemberList()
//   memberListInstance.getMemberStorage().then((memberList)=>{
//     expect(memberList.length).toBeGreaterThan(0);
//   })
// });

test('test fetch', () => {
  fetch('https://api.github.com/repos/danielbayerlein/amplify-js/languages')
  .then(res => res.json())
  .then((res) => {
    expect(Object.keys(res).length).toBeGreaterThan(0);
  })
});
