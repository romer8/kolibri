import { UserKinds, MaxPointsPerContent } from '../constants';
import some from 'lodash/some';

function isUserLoggedIn(state) {
  return state.core.session.kind[0] !== UserKinds.ANONYMOUS;
}

function isSuperuser(state) {
  return state.core.session.kind[0] === UserKinds.SUPERUSER;
}

function isAdmin(state) {
  return state.core.session.kind.includes(UserKinds.ADMIN);
}

function isCoach(state) {
  return state.core.session.kind[0] === UserKinds.COACH;
}

function isLearner(state) {
  return state.core.session.kind[0] === UserKinds.LEARNER;
}

function canManageContent(state) {
  return state.core.session.can_manage_content;
}

function getUserRole(state) {
  if (state.core.session.kind.includes(UserKinds.ADMIN)) {
    return UserKinds.ADMIN;
  } else if (state.core.session.kind.includes(UserKinds.COACH)) {
    return UserKinds.COACH;
  } else if (state.core.session.kind.includes(UserKinds.LEARNER)) {
    return UserKinds.LEARNER;
  }
  return UserKinds.ANONYMOUS;
}

function getUserPermissions(state) {
  const permissions = {};
  permissions.can_manage_content = state.core.session.can_manage_content;
  return permissions;
}

function userHasPermissions(state) {
  return some(getUserPermissions(state), permission => permission === true);
}

function currentFacilityId(state) {
  return state.core.session.facility_id;
}

function currentUserId(state) {
  return state.core.session.user_id;
}

function facilityConfig(state) {
  return state.core.facilityConfig;
}

function getChannels(state) {
  return state.core.channels.list;
}

/*
 * Not actually a getter, as it is not pure, defined here for convenience and use in actions
 */
function getChannelObject(state, channelId) {
  return getChannels(state).find(channel => channel.id === channelId);
}

function totalPoints(state) {
  return state.core.totalProgress * MaxPointsPerContent;
}

function contentPoints(state) {
  return Math.floor(state.core.logging.summary.progress) * MaxPointsPerContent;
}

function sessionTimeSpent(state) {
  return state.core.logging.session.time_spent;
}

export {
  isUserLoggedIn,
  isSuperuser,
  isAdmin,
  isCoach,
  isLearner,
  getChannels,
  getChannelObject,
  currentFacilityId,
  totalPoints,
  contentPoints,
  currentUserId,
  facilityConfig,
  sessionTimeSpent,
  canManageContent,
  getUserRole,
  getUserPermissions,
  userHasPermissions,
};
