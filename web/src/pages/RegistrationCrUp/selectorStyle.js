export const planStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#ee4d64',
    background: state.isSelected ? '#ee4d64' : 'none',
  }),
  control: styles => ({
    ...styles,
    minWidth: 180,
    height: 44,
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
  indicatorsContainer: styles => ({
    ...styles,
    height: 44,
  }),
  input: styles => ({
    ...styles,
    height: 41,
    color: '#444',
    fontWeight: 'bold',
  }),
};

export const studentStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#fff' : '#ee4d64',
    background: state.isSelected ? '#ee4d64' : 'none',
  }),
  control: styles => ({
    ...styles,
    height: 44,
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
  indicatorsContainer: styles => ({
    ...styles,
    height: 44,
  }),
  input: styles => ({
    ...styles,
    height: 41,
    color: '#444',
    fontWeight: 'bold',
  }),
};
