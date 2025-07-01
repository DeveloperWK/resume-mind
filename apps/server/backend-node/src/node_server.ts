import APP from "./app";
const PORT = process.env._PORT || 5000;
APP.listen(PORT, () => console.log(`Node server running on port ${PORT}`));
