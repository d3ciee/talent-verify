import { Account } from "../company/account";
import { Prettify } from "../helper";

type _TNotLoggedAuthCtx = {
  isLoggedIn: false | null;
  account: null;
};

type _TLoggedAuthCtx = {
  isLoggedIn: true;
  //TODO: -> Change type from 'any' when correct data shape comes
  account: Account;
};

type _TConcatTypes = _TLoggedAuthCtx | _TNotLoggedAuthCtx;
export type AuthContext = Prettify<_TConcatTypes>;
