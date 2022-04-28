const mockImageUrls = [
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDE1OTd8MXwxfGFsbHwxfHx8fHx8Mnx8MTY0NDg3MDAyNQ&ixlib=rb-1.2.1&q=85",
  "https://images.unsplash.com/photo-1644851159620-225a1bbb8bb5?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDE1OTd8MHwxfGFsbHwyfHx8fHx8Mnx8MTY0NDg3MDAyNQ&ixlib=rb-1.2.1&q=85",
  "https://images.unsplash.com/photo-1644847381517-ec85d23114a3?crop=entropy&cs=srgb&fm=jpg&ixid=MnwzMDE1OTd8MHwxfGFsbHwzfHx8fHx8Mnx8MTY0NDg3MDAyNQ&ixlib=rb-1.2.1&q=85"
];

export default {
  get: jest.fn().mockResolvedValue(mockImageUrls)
};
