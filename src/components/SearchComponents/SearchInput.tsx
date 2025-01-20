import React, { FC } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { PlaceItem } from './PlaceItem.tsx';
import { colors } from '../../theme/colors.ts';
import { useVw } from '../../hooks/useVw.ts';

interface SearchInputProps {
  searchText: string;
  places: any[];
  errorMessage: string | null;
  handleSearchChange: (text: string) => void;
  handlePlaceSelect: (place: any) => void;
}

export const SearchInput: FC<SearchInputProps> = ({
  searchText,
  places,
  errorMessage,
  handleSearchChange,
  handlePlaceSelect,
}) => {
  return (
    <View style={[styles.inputContainer]}>
      <TextInput
        style={styles.textInput}
        placeholder="Type city name..."
        value={searchText}
        onChangeText={handleSearchChange}
      />

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      {places.length > 0 && (
        <FlatList
          style={styles.placesList}
          data={places}
          renderItem={({ item }) => (
            <PlaceItem item={item} onSelect={handlePlaceSelect} />
          )}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    flex: 7,
    height: '100%',
  },
  textInput: {
    borderColor: colors.border.primary,
    backgroundColor: colors.background.primary,
    borderWidth: useVw(1),
    paddingLeft: useVw(12),
    fontSize: useVw(18),
  },
  placesList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 999,
    backgroundColor: colors.background.primary,
    width: '100%',
    maxHeight: 200,
    borderWidth: useVw(1),
    borderColor: colors.border.primary,
  },
  errorMessage: {
    color: colors.error.primary,
    fontSize: useVw(14),
    marginTop: useVw(2),
  },
});

