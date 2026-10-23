export const me = { id: "me", name: "Soliman" };

export const initialChats = [
  {
    id: 1,
    name: "Rahim",
    online: true,
    unread: 2,
    messages: [
      { id: 1, from: "them", text: "Assalamu alaikum, kmn acho?", time: "10:30 AM" },
      { id: 2, from: "me", text: "Valo alhamdulillah, tumi?", time: "10:31 AM" },
      { id: 3, from: "them", text: "Project er kaj koto dur?", time: "10:32 AM" },
    ],
  },
  {
    id: 2,
    name: "Karim",
    online: false,
    unread: 0,
    messages: [{ id: 1, from: "them", text: "Ok bhai, kalke dekha hobe", time: "Yesterday" }],
  },
  {
    id: 3,
    name: "CSE Batch 35M",
    online: true,
    unread: 5,
    messages: [{ id: 1, from: "them", text: "Kal class ache naki?", time: "9:10 AM" }],
  },
  {
    id: 4,
    name: "Sara",
    online: true,
    unread: 0,
    messages: [{ id: 1, from: "them", text: "Notes ta pathiye dio 🙏", time: "8:45 AM" }],
  },
];
