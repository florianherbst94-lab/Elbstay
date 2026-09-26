const fs = require('fs');
const file = 'src/app/(app)/apartments/boutique-2/page.tsx';
let content = fs.readFileSync(file, 'utf-8');

content = content.replace(/<hospitable-direct-property identifier="[^"]+" property="[^"]+"><\/hospitable-direct-property>/, 
  '{/* TODO: HIER DIE HOSPITABLE PROPERTY ID FÜR DIE NEUE WOHNUNG EINTRAGEN */}\n              {/* @ts-ignore */}\n              <hospitable-direct-property identifier="a20a137a-0c7e-42ba-8aa6-9c47accca90f" property="NEUE_PROPERTY_ID_HIER_EINTRAGEN"></hospitable-direct-property>'
);

fs.writeFileSync(file, content);
