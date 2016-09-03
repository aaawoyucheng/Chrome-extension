(function() {
  var customProfiles, i, module, shortcutKeys, _i,
    __hasProp = {}.hasOwnProperty;

  module = angular.module('omegaPopup', ['omegaTarget', 'omegaDecoration', 'ui.bootstrap', 'ui.validate']);

  module.filter('tr', function(omegaTarget) {
    return omegaTarget.getMessage;
  });

  module.filter('dispName', function(omegaTarget) {
    return function(name) {
      if (typeof name === 'object') {
        name = name.name;
      }
      return omegaTarget.getMessage('profile_' + name) || name;
    };
  });

  shortcutKeys = {
    38: function(activeIndex, items) {
      var i, _ref;
      i = activeIndex - 1;
      if (i >= 0) {
        return (_ref = items.eq(i)[0]) != null ? _ref.focus() : void 0;
      }
    },
    40: function(activeIndex, items) {
      var _ref;
      return (_ref = items.eq(activeIndex + 1)[0]) != null ? _ref.focus() : void 0;
    },
    48: '+direct',
    83: '+system',
    191: 'help',
    63: 'help',
    69: 'external',
    65: 'addRule',
    43: 'addRule',
    61: 'addRule',
    84: 'tempRule',
    79: 'option',
    73: 'issue',
    76: 'log'
  };

  for (i = _i = 1; _i <= 9; i = ++_i) {
    shortcutKeys[48 + i] = i;
  }

  customProfiles = (function() {
    var _customProfiles;
    _customProfiles = null;
    return function() {
      return _customProfiles != null ? _customProfiles : _customProfiles = jQuery('.custom-profile:not(.ng-hide) > a');
    };
  })();

  jQuery(document).on('keydown', function(e) {
    var handler, items, key, keys, shortcut, showHelp, _ref, _ref1;
    handler = shortcutKeys[e.keyCode];
    if (!handler) {
      return;
    }
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
      return;
    }
    switch (typeof handler) {
      case 'string':
        switch (handler) {
          case 'help':
            showHelp = function(element, key) {
              var span;
              if (typeof element === 'string') {
                element = jQuery("a[data-shortcut='" + element + "']");
              }
              span = jQuery('.shortcut-help', element);
              if (span.length === 0) {
                span = jQuery('<span/>').addClass('shortcut-help');
              }
              span.text(key);
              return element.find('.glyphicon').after(span);
            };
            keys = {
              '+direct': '0',
              '+system': 'S',
              'external': 'E',
              'addRule': 'A',
              'tempRule': 'T',
              'option': 'O',
              'issue': 'I',
              'log': 'L'
            };
            for (shortcut in keys) {
              key = keys[shortcut];
              showHelp(shortcut, key);
            }
            customProfiles().each(function(i, el) {
              if (i <= 8) {
                return showHelp(jQuery(el), i + 1);
              }
            });
            break;
          default:
            if ((_ref = jQuery("a[data-shortcut='" + handler + "']")[0]) != null) {
              _ref.click();
            }
        }
        break;
      case 'number':
        if ((_ref1 = customProfiles().eq(handler - 1)) != null) {
          _ref1.click();
        }
        break;
      case 'function':
        items = jQuery('.popup-menu-nav > li:not(.ng-hide) > a');
        i = items.index(jQuery(e.target).closest('a'));
        if (i === -1) {
          i = items.index(jQuery('.popup-menu-nav > li.active > a'));
        }
        handler(i, items);
    }
    return false;
  });

  module.controller('PopupCtrl', function($scope, $window, $q, omegaTarget, profileIcons, profileOrder, dispNameFilter, getVirtualTarget) {
    var refresh, refreshOnProfileChange;
    $scope.closePopup = function() {
      return $window.close();
    };
    $scope.openManage = function() {
      omegaTarget.openManage();
      return $window.close();
    };
    refreshOnProfileChange = false;
    refresh = function() {
      if (refreshOnProfileChange) {
        return omegaTarget.refreshActivePage().then(function() {
          return $window.close();
        });
      } else {
        return $window.close();
      }
    };
    $scope.profileIcons = profileIcons;
    $scope.dispNameFilter = dispNameFilter;
    $scope.isActive = function(profileName) {
      if ($scope.isSystemProfile) {
        return profileName === 'system';
      } else {
        return $scope.currentProfileName === profileName;
      }
    };
    $scope.isEffective = function(profileName) {
      return $scope.isSystemProfile && $scope.currentProfileName === profileName;
    };
    $scope.getIcon = function(profile, normal) {
      if (!profile) {
        return;
      }
      if (!normal && $scope.isEffective(profile.name)) {
        return 'glyphicon-ok';
      } else {
        return void 0;
      }
    };
    $scope.getProfileTitle = function(profile, normal) {
      var desc;
      desc = '';
      while (profile) {
        desc = profile.desc;
        profile = getVirtualTarget(profile, $scope.availableProfiles);
      }
      return desc || (profile != null ? profile.name : void 0) || '';
    };
    $scope.openOptions = function(hash) {
      return omegaTarget.openOptions(hash).then(function() {
        return $window.close();
      });
    };
    $scope.openConditionHelp = function() {
      var pname;
      pname = encodeURIComponent($scope.currentProfileName);
      return $scope.openOptions("#/profile/" + pname + "?help=condition");
    };
    $scope.applyProfile = function(profile) {
      var apply, next;
      next = function() {
        if (profile.profileType === 'SwitchProfile') {
          return omegaTarget.state('web.switchGuide').then(function(switchGuide) {
            if (switchGuide === 'showOnFirstUse') {
              return $scope.openOptions("#/profile/" + profile.name);
            }
          });
        }
      };
      if (!refreshOnProfileChange) {
        omegaTarget.applyProfileNoReply(profile.name);
        apply = next();
      } else {
        apply = omegaTarget.applyProfile(profile.name).then(function() {
          return omegaTarget.refreshActivePage();
        }).then(next);
      }
      if (apply) {
        return apply.then(function() {
          return $window.close();
        });
      } else {
        return $window.close();
      }
    };
    $scope.tempRuleMenu = {
      open: false
    };
    $scope.nameExternal = {
      open: false
    };
    $scope.addTempRule = function(domain, profileName) {
      $scope.tempRuleMenu.open = false;
      return omegaTarget.addTempRule(domain, profileName).then(function() {
        return refresh();
      });
    };
    $scope.setDefaultProfile = function(profileName, defaultProfileName) {
      return omegaTarget.setDefaultProfile(profileName, defaultProfileName).then(function() {
        return refresh();
      });
    };
    $scope.addCondition = function(condition, profileName) {
      return omegaTarget.addCondition(condition, profileName).then(function() {
        return refresh();
      });
    };
    $scope.validateProfileName = {
      conflict: '!$value || !availableProfiles["+" + $value]',
      hidden: '!$value || $value[0] != "_"'
    };
    $scope.saveExternal = function() {
      var name;
      $scope.nameExternal.open = false;
      name = $scope.externalProfile.name;
      if (name) {
        return omegaTarget.addProfile($scope.externalProfile).then(function() {
          return omegaTarget.applyProfile(name).then(function() {
            return refresh();
          });
        });
      }
    };
    omegaTarget.state(['availableProfiles', 'currentProfileName', 'isSystemProfile', 'validResultProfiles', 'refreshOnProfileChange', 'externalProfile', 'proxyNotControllable']).then(function(_arg) {
      var availableProfiles, charCodeUnderscore, currentProfileName, externalProfile, isSystemProfile, key, profile, profilesByNames, proxyNotControllable, refresh, validResultProfiles;
      availableProfiles = _arg[0], currentProfileName = _arg[1], isSystemProfile = _arg[2], validResultProfiles = _arg[3], refresh = _arg[4], externalProfile = _arg[5], proxyNotControllable = _arg[6];
      $scope.proxyNotControllable = proxyNotControllable;
      if (proxyNotControllable) {
        return;
      }
      $scope.availableProfiles = availableProfiles;
      $scope.currentProfile = availableProfiles['+' + currentProfileName];
      $scope.currentProfileName = currentProfileName;
      $scope.isSystemProfile = isSystemProfile;
      $scope.externalProfile = externalProfile;
      refreshOnProfileChange = refresh;
      charCodeUnderscore = '_'.charCodeAt(0);
      profilesByNames = function(names) {
        var name, profiles, shown, _j, _len;
        profiles = [];
        for (_j = 0, _len = names.length; _j < _len; _j++) {
          name = names[_j];
          shown = name.charCodeAt(0) !== charCodeUnderscore || name.charCodeAt(1) !== charCodeUnderscore;
          if (shown) {
            profiles.push(availableProfiles['+' + name]);
          }
        }
        return profiles;
      };
      $scope.validResultProfiles = profilesByNames(validResultProfiles);
      $scope.builtinProfiles = [];
      $scope.customProfiles = [];
      for (key in availableProfiles) {
        if (!__hasProp.call(availableProfiles, key)) continue;
        profile = availableProfiles[key];
        if (profile.builtin) {
          $scope.builtinProfiles.push(profile);
        } else if (profile.name.charCodeAt(0) !== charCodeUnderscore) {
          $scope.customProfiles.push(profile);
        }
        if (profile.validResultProfiles) {
          profile.validResultProfiles = profilesByNames(profile.validResultProfiles);
        }
      }
      return $scope.customProfiles.sort(profileOrder);
    });
    return omegaTarget.getActivePageInfo().then(function(info) {
      if (info) {
        $scope.currentTempRuleProfile = info.tempRuleProfileName;
        return $scope.currentDomain = info.domain;
      } else {
        return $q.reject();
      }
    }).then(function() {
      return omegaTarget.state('currentProfileCanAddRule');
    }).then(function(value) {
      var conditionSuggestion, currentDomain, currentDomainEscaped, _ref;
      $scope.currentProfileCanAddRule = value;
      if ($scope.currentProfileCanAddRule) {
        currentDomain = $scope.currentDomain;
        currentDomainEscaped = currentDomain.replace('.', '\\.');
        conditionSuggestion = {
          'HostWildcardCondition': '*.' + currentDomain,
          'HostRegexCondition': '(^|\\.)' + currentDomainEscaped + '$',
          'UrlWildcardCondition': '*://*.' + currentDomain + '/*',
          'UrlRegexCondition': '://([^/.]+\\.)*' + currentDomainEscaped + '/',
          'KeywordCondition': currentDomain
        };
        $scope.rule = {
          condition: {
            conditionType: 'HostWildcardCondition',
            pattern: conditionSuggestion['HostWildcardCondition']
          },
          profileName: (_ref = $scope.currentTempRuleProfile) != null ? _ref : 'direct'
        };
        return $scope.$watch('rule.condition.conditionType', function(type) {
          return $scope.rule.condition.pattern = conditionSuggestion[type];
        });
      }
    });
  });

}).call(this);
