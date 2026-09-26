const { syncProperties, syncReservations } = require('./src/lib/hospitable/sync.js');

async function run() {
  console.log("Syncing properties...");
  const count = await syncProperties();
  console.log("Synced properties:", count);
}

run();
