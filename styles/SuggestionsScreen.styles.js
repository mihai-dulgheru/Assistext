import {StyleSheet} from 'react-native';
import {borderRadius, colors} from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white,
  },
  textInput: {
    minHeight: 100,
    borderColor: colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    backgroundColor: colors.white,
    textAlignVertical: 'top',
    borderRadius: borderRadius['2xl'],
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
    fontWeight: '400',
    color: colors.text,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: borderRadius['2xl'],
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '600',
  },
  copyButton: {
    backgroundColor: colors.accent,
    padding: 15,
    borderRadius: borderRadius['2xl'],
    shadowColor: colors.accent,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  copyButtonText: {
    color: colors.white,
    fontSize: 18,
    lineHeight: 28,
  },
});

export default styles;
