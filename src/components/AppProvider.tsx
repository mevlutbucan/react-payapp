import {
  NetworkProvider,
  NumberProvider,
  HolderProvider,
  ExpDateProvider,
  CvcProvider,
} from 'providers';

const AppProvider: IProviderComponent = function ({ children }) {
  return (
    <NetworkProvider>
      <NumberProvider>
        <HolderProvider>
          <ExpDateProvider>
            <CvcProvider>{children}</CvcProvider>
          </ExpDateProvider>
        </HolderProvider>
      </NumberProvider>
    </NetworkProvider>
  );
};

export default AppProvider;
