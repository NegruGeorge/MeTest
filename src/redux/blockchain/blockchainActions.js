import Web3EthContract from "web3-eth-contract"
import Web3 from "web3"
import NFTContract from "../../abi/NFTSchechers.json"


const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    };
}

const connectSucces = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    }
}

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    }
}
const updateAccountRequest = (payload) => {
    return {
      type: "UPDATE_ACCOUNT",
      payload: payload,
    };
}


export const connect = () => {
    return async (dispatch) => {
        dispatch(connectRequest());
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            Web3EthContract.setProvider(ethereum);
            let web3 = new Web3(ethereum);
            try {
                const accounts = await ethereum.request({
                    method: "eth_requestAccounts",
                });
                const networkId = await ethereum.request({
                    method: "net_version",
                });
                // rinkeby: 0x201BD073a60D411344632aE634690bf779E4d3B4
                if (networkId == 4) {
                    const SmartContractObj = new Web3EthContract(
                        NFTContract,
                        "0x201BD073a60D411344632aE634690bf779E4d3B4"
                    );
                    dispatch(
                        connectSucces({
                            account: accounts[0],
                            smartContract: SmartContractObj,
                            web3: web3,
                        })
                    );
                    //add listeneres start
                    ethereum.on("accountsChanged", (accounts) => {
                        dispatch(updateAccount(accounts[0]));
                    });
                    ethereum.on("chainChanged", () => {
                        window.location.reload();
                    });
                    // add listenres end
                } else {
                    dispatch(connectFailed("Change Network to Polygon"));
                }
            } catch (err) {
                console.log(err)
                dispatch(connectFailed("Something went wrong... :("))
            }
        } else {
            dispatch(connectFailed("Please use Metamask. "))
        }
    }
}


export const updateAccount = (account) => {
    return async (dispatch) => {
      dispatch(updateAccountRequest({ account: account }));
    //   dispatch(fetchData(account));
    };
  };