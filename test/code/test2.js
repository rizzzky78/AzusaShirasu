// sample

switch (commands) {
  case 'yourcommand': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */
          // code here
          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);});
      } catch {
        /* Rejection */
        return reply(NotRegistered);}
    })();
  } break

  // or

  case 'yourcommand': {
    (async () => {
      try {
        let user_id = m.sender.split('@')[0]; let parseId = parseInt(user_id);
        await atlasData(parseId).then(async result => {
          let user = result.userID; let getID = result.userID; let value = await result.limit;
          if (!user == parseId) { return reply(NotRegistered) };
          if (value == 0) { return alpha.send1ButMes(m.chat, userHasEmptyLimit, `@${ownername}`, `howtolimit`, `Bundle Limit`, m); };

          /* Start Process */

          try {
            /* RESOLVE */
          } catch {
            /* REJECT */
          }

          /* End Process */

          let getChange = await value - 1; let monit = await atlasUpdate(getID, getChange); console.log("Limit changes -1:", monit);
        });
      } catch {
        /* Rejection */
        return reply(NotRegistered);
      }
    })();
  } break


}

// temporary


