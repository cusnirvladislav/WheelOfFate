import React, {useEffect} from 'react';
import faker from 'faker';
import {_getEngineersAsync, _saveEngineersAsync} from './theme/localstorge';
import RootNavigation from './navigation';
import {_fetchEnginers} from './screens/EngineersScreen/store/actions';
import {useDispatch} from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const engineers = await _getEngineersAsync();
        if (engineers?.length === 0 || engineers === null) {
          let data = [];

          for (let i = 0; i < 10; i++) {
            data.push({
              id: faker.datatype.uuid(),
              name: faker.name.findName(),
              imageUrl: faker.image.avatar(),
            });
          }

          await _saveEngineersAsync(data);
          dispatch(_fetchEnginers());
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return <RootNavigation />;
};

export default App;
