import React from 'react';
import { FlatList } from 'react-native';
import { Subscribe } from 'unstated';
import Spinner from 'react-native-loading-spinner-overlay';
import WordCard from '../components/WordCard';
import WordStateContainer from '../state-containers/WordStateContainer';

const UnitScreen = (indexStart, indexEnd) => () => (
  <Subscribe to={[WordStateContainer]}>
    {container => {
      if (container.state.favoriteDataLoaded) {
        return (
          <React.Fragment>
            <FlatList
              style={{ backgroundColor: '#e57373' }}
              data={container.state.data.slice(indexStart, indexEnd)}
              renderItem={({ item }) => (
                <WordCard cardData={item} index={item.id} />
              )}
              removeClippedSubviews
              disableVirtualization
              keyExtractor={(_, index) => index.toString()}
              overScrollMode="always"
            />
          </React.Fragment>
        );
      }
      container.getFavoriteData();
      return <Spinner visible />;
    }}
  </Subscribe>
);
export default UnitScreen;
