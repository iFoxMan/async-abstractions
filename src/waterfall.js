export default (callChain, mainCallBack) => {
  if (callChain.length === 0) {
    mainCallBack();
    return;
  }

  const iter = ([headCall, ...restCalls], prevResult) => {
    const innerCallBack = (err, ...args) => {
      if (err) {
        mainCallBack(err, args);
        return;
      }

      if (restCalls.length === 0) {
        mainCallBack(null, args);
        return;
      }

      iter(restCalls, args);
    };

    headCall(...prevResult, innerCallBack);
  };

  iter(callChain, []);
};
