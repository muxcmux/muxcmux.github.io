/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "00a2905-" + chunkId + "-wps-hmr.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "00a2905-wps-hmr.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "343fa489761c8e96b6aa";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "app";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/webpack-plugin-serve/client.js":
/*!******************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/client.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n\n/**\n * @note This file exists merely as an easy reference for folks adding it to their configuration entries\n */\n\n(() => {\n  /* eslint-disable global-require */\n  const { run } = __webpack_require__(/*! ./lib/client/client */ \"../node_modules/webpack-plugin-serve/lib/client/client.js\");\n  let hash = '<unknown>';\n  let options;\n  try {\n    options = {\"compress\":null,\"headers\":null,\"historyFallback\":false,\"hmr\":true,\"host\":\"localhost\",\"liveReload\":true,\"log\":{\"level\":\"info\",\"prefix\":{\"template\":\"{{level}}\"},\"name\":\"webpack-plugin-serve\"},\"open\":false,\"port\":55555,\"progress\":true,\"ramdisk\":false,\"secure\":false,\"static\":[\"../../public/\"],\"status\":true,\"address\":\"localhost:55555\",\"compilerName\":null,\"wpsId\":\"00a2905\"};\n  } catch (e) {\n    const { log } = __webpack_require__(/*! ./lib/client/log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\");\n    log.error(\n      'The entry for webpack-plugin-serve was included in your build, but it does not appear that the plugin was. Please check your configuration.'\n    );\n  }\n\n  try {\n    // eslint-disable-next-line camelcase\n    hash = __webpack_require__.h();\n  } catch (e) {} // eslint-disable-line no-empty\n\n  run(hash, options);\n})();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2NsaWVudC5qcz82ZGM0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVMsTUFBTSxHQUFHLG1CQUFPLENBQUMsc0ZBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbVhBQVc7QUFDekIsR0FBRztBQUNILFdBQVcsTUFBTSxHQUFHLG1CQUFPLENBQUMsZ0ZBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLHVCQUFnQjtBQUMzQixHQUFHLGFBQWE7O0FBRWhCO0FBQ0EsQ0FBQyIsImZpbGUiOiIuLi9ub2RlX21vZHVsZXMvd2VicGFjay1wbHVnaW4tc2VydmUvY2xpZW50LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cblxuLyoqXG4gKiBAbm90ZSBUaGlzIGZpbGUgZXhpc3RzIG1lcmVseSBhcyBhbiBlYXN5IHJlZmVyZW5jZSBmb3IgZm9sa3MgYWRkaW5nIGl0IHRvIHRoZWlyIGNvbmZpZ3VyYXRpb24gZW50cmllc1xuICovXG5cbigoKSA9PiB7XG4gIC8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG4gIGNvbnN0IHsgcnVuIH0gPSByZXF1aXJlKCcuL2xpYi9jbGllbnQvY2xpZW50Jyk7XG4gIGxldCBoYXNoID0gJzx1bmtub3duPic7XG4gIGxldCBvcHRpb25zO1xuICB0cnkge1xuICAgIG9wdGlvbnMgPSDKjsmQybnJlG9zx53KjMm5x51zO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc3QgeyBsb2cgfSA9IHJlcXVpcmUoJy4vbGliL2NsaWVudC9sb2cnKTtcbiAgICBsb2cuZXJyb3IoXG4gICAgICAnVGhlIGVudHJ5IGZvciB3ZWJwYWNrLXBsdWdpbi1zZXJ2ZSB3YXMgaW5jbHVkZWQgaW4geW91ciBidWlsZCwgYnV0IGl0IGRvZXMgbm90IGFwcGVhciB0aGF0IHRoZSBwbHVnaW4gd2FzLiBQbGVhc2UgY2hlY2sgeW91ciBjb25maWd1cmF0aW9uLidcbiAgICApO1xuICB9XG5cbiAgdHJ5IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY2FtZWxjYXNlXG4gICAgaGFzaCA9IF9fd2VicGFja19oYXNoX187XG4gIH0gY2F0Y2ggKGUpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZW1wdHlcblxuICBydW4oaGFzaCwgb3B0aW9ucyk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/client.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js":
/*!***********************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, refresh, warn } = __webpack_require__(/*! ./log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\n// ignore 1008 (HTTP 400 equivalent) and 1011 (HTTP 500 equivalent)\nconst ignoreCodes = [1008, 1011];\nconst maxAttempts = 10;\n\nclass ClientSocket {\n  constructor(options, ...args) {\n    this.args = args;\n    this.attempts = 0;\n    this.eventHandlers = [];\n    this.options = options;\n    this.retrying = false;\n\n    this.connect();\n  }\n\n  addEventListener(...args) {\n    this.eventHandlers.push(args);\n    this.socket.addEventListener(...args);\n  }\n\n  close() {\n    this.socket.close();\n  }\n\n  connect() {\n    if (this.socket) {\n      delete this.socket;\n    }\n\n    this.connecting = true;\n\n    this.socket = new WebSocket(...this.args);\n\n    if (this.options.retry) {\n      this.socket.addEventListener('close', (event) => {\n        if (ignoreCodes.includes(event.code)) {\n          return;\n        }\n\n        if (!this.retrying) {\n          warn(`The WebSocket was closed and will attempt to reconnect`);\n        }\n\n        this.reconnect();\n      });\n    } else {\n      this.socket.onclose = () => warn(`The client WebSocket was closed. ${refresh}`);\n    }\n\n    this.socket.addEventListener('open', () => {\n      this.attempts = 0;\n      this.retrying = false;\n    });\n\n    if (this.eventHandlers.length) {\n      for (const [name, fn] of this.eventHandlers) {\n        this.socket.addEventListener(name, fn);\n      }\n    }\n  }\n\n  reconnect() {\n    this.attempts += 1;\n    this.retrying = true;\n\n    if (this.attempts > maxAttempts) {\n      error(`The WebSocket could not be reconnected. ${refresh}`);\n      this.retrying = false;\n      return;\n    }\n\n    const timeout = 1000 * this.attempts ** 2;\n\n    setTimeout(() => this.connect(this.args), timeout);\n  }\n\n  removeEventListener(...args) {\n    const [, handler] = args;\n    this.eventHandlers = this.eventHandlers.filter(([, fn]) => fn === handler);\n    this.socket.removeEventListener(...args);\n  }\n}\n\nmodule.exports = { ClientSocket };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvQ2xpZW50U29ja2V0LmpzP2RiNjEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyx1QkFBdUIsR0FBRyxtQkFBTyxDQUFDLHFFQUFPOztBQUVoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLDJFQUEyRSxRQUFRO0FBQ25GOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVEQUF1RCxRQUFRO0FBQy9EO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvQ2xpZW50U29ja2V0LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgZXJyb3IsIHJlZnJlc2gsIHdhcm4gfSA9IHJlcXVpcmUoJy4vbG9nJykoKTtcblxuLy8gaWdub3JlIDEwMDggKEhUVFAgNDAwIGVxdWl2YWxlbnQpIGFuZCAxMDExIChIVFRQIDUwMCBlcXVpdmFsZW50KVxuY29uc3QgaWdub3JlQ29kZXMgPSBbMTAwOCwgMTAxMV07XG5jb25zdCBtYXhBdHRlbXB0cyA9IDEwO1xuXG5jbGFzcyBDbGllbnRTb2NrZXQge1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCAuLi5hcmdzKSB7XG4gICAgdGhpcy5hcmdzID0gYXJncztcbiAgICB0aGlzLmF0dGVtcHRzID0gMDtcbiAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSBbXTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgIHRoaXMucmV0cnlpbmcgPSBmYWxzZTtcblxuICAgIHRoaXMuY29ubmVjdCgpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lciguLi5hcmdzKSB7XG4gICAgdGhpcy5ldmVudEhhbmRsZXJzLnB1c2goYXJncyk7XG4gICAgdGhpcy5zb2NrZXQuYWRkRXZlbnRMaXN0ZW5lciguLi5hcmdzKTtcbiAgfVxuXG4gIGNsb3NlKCkge1xuICAgIHRoaXMuc29ja2V0LmNsb3NlKCk7XG4gIH1cblxuICBjb25uZWN0KCkge1xuICAgIGlmICh0aGlzLnNvY2tldCkge1xuICAgICAgZGVsZXRlIHRoaXMuc29ja2V0O1xuICAgIH1cblxuICAgIHRoaXMuY29ubmVjdGluZyA9IHRydWU7XG5cbiAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoLi4udGhpcy5hcmdzKTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmV0cnkpIHtcbiAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChpZ25vcmVDb2Rlcy5pbmNsdWRlcyhldmVudC5jb2RlKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5yZXRyeWluZykge1xuICAgICAgICAgIHdhcm4oYFRoZSBXZWJTb2NrZXQgd2FzIGNsb3NlZCBhbmQgd2lsbCBhdHRlbXB0IHRvIHJlY29ubmVjdGApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNvY2tldC5vbmNsb3NlID0gKCkgPT4gd2FybihgVGhlIGNsaWVudCBXZWJTb2NrZXQgd2FzIGNsb3NlZC4gJHtyZWZyZXNofWApO1xuICAgIH1cblxuICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ29wZW4nLCAoKSA9PiB7XG4gICAgICB0aGlzLmF0dGVtcHRzID0gMDtcbiAgICAgIHRoaXMucmV0cnlpbmcgPSBmYWxzZTtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmV2ZW50SGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICBmb3IgKGNvbnN0IFtuYW1lLCBmbl0gb2YgdGhpcy5ldmVudEhhbmRsZXJzKSB7XG4gICAgICAgIHRoaXMuc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm4pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlY29ubmVjdCgpIHtcbiAgICB0aGlzLmF0dGVtcHRzICs9IDE7XG4gICAgdGhpcy5yZXRyeWluZyA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5hdHRlbXB0cyA+IG1heEF0dGVtcHRzKSB7XG4gICAgICBlcnJvcihgVGhlIFdlYlNvY2tldCBjb3VsZCBub3QgYmUgcmVjb25uZWN0ZWQuICR7cmVmcmVzaH1gKTtcbiAgICAgIHRoaXMucmV0cnlpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lb3V0ID0gMTAwMCAqIHRoaXMuYXR0ZW1wdHMgKiogMjtcblxuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5jb25uZWN0KHRoaXMuYXJncyksIHRpbWVvdXQpO1xuICB9XG5cbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciguLi5hcmdzKSB7XG4gICAgY29uc3QgWywgaGFuZGxlcl0gPSBhcmdzO1xuICAgIHRoaXMuZXZlbnRIYW5kbGVycyA9IHRoaXMuZXZlbnRIYW5kbGVycy5maWx0ZXIoKFssIGZuXSkgPT4gZm4gPT09IGhhbmRsZXIpO1xuICAgIHRoaXMuc29ja2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoLi4uYXJncyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7IENsaWVudFNvY2tldCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/client.js":
/*!*****************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/client.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\n/* eslint-disable global-require */\nconst run = (buildHash, options) => {\n  const { address, client = {}, progress, secure, status } = options;\n\n  options.firstInstance = !window.webpackPluginServe; // eslint-disable-line no-param-reassign\n\n  window.webpackPluginServe = window.webpackPluginServe || {\n    compilers: {}\n  };\n  window.webpackPluginServe.silent = !!client.silent;\n\n  const { ClientSocket } = __webpack_require__(/*! ./ClientSocket */ \"../node_modules/webpack-plugin-serve/lib/client/ClientSocket.js\");\n  const { replace } = __webpack_require__(/*! ./hmr */ \"../node_modules/webpack-plugin-serve/lib/client/hmr.js\");\n  const { error, info, warn } = __webpack_require__(/*! ./log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\n  const protocol = secure ? 'wss' : 'ws';\n  const socket = new ClientSocket(client, `${protocol}://${client.address || address}/wps`);\n\n  const { compilerName } = options;\n\n  window.webpackPluginServe.compilers[compilerName] = {};\n\n  // prevents ECONNRESET errors on the server\n  window.addEventListener('beforeunload', () => socket.close());\n\n  socket.addEventListener('message', (message) => {\n    const { action, data = {} } = JSON.parse(message.data);\n    const { errors, hash = '<?>', warnings } = data || {};\n    const shortHash = hash.slice(0, 7);\n    const identifier = options.compilerName ? `(Compiler: ${options.compilerName}) ` : '';\n    const compiler = window.webpackPluginServe.compilers[compilerName];\n    const { wpsId } = data;\n\n    switch (action) {\n      case 'build':\n        compiler.done = false;\n        break;\n      case 'connected':\n        info(`WebSocket connected ${identifier}`);\n        break;\n      case 'done':\n        compiler.done = true;\n        break;\n      case 'problems':\n        if (data.errors.length) {\n          error(`${identifier}Build ${shortHash} produced errors:\\n`, errors);\n        }\n        if (data.warnings.length) {\n          warn(`${identifier}Build ${shortHash} produced warnings:\\n`, warnings);\n        }\n        break;\n      case 'reload':\n        window.location.reload();\n        break;\n      case 'replace':\n        // actions with a wpsId in tow indicate actions that should only be executed when the wpsId sent\n        // matches the wpsId set in options. this is how we can identify multiple compilers in the\n        // client.\n        if (wpsId && wpsId === options.wpsId) {\n          replace(buildHash, hash);\n        }\n        break;\n      default:\n    }\n  });\n\n  if (options.firstInstance) {\n    if (progress === 'minimal') {\n      const { init } = __webpack_require__(/*! ./overlays/progress-minimal */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js\");\n      init(options, socket);\n    } else if (progress) {\n      const { init } = __webpack_require__(/*! ./overlays/progress */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js\");\n      init(options, socket);\n    }\n\n    if (status) {\n      const { init } = __webpack_require__(/*! ./overlays/status */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/status.js\");\n      init(options, socket);\n    }\n\n    if (true) {\n      info('Hot Module Replacement is active');\n\n      if (options.liveReload) {\n        info('Live Reload taking precedence over Hot Module Replacement');\n      }\n    } else {}\n\n    if (false) {}\n  }\n};\n\nmodule.exports = { run };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvY2xpZW50LmpzP2NkZDciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMscUJBQXFCLDRCQUE0Qjs7QUFFMUQscURBQXFEOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTLGVBQWUsR0FBRyxtQkFBTyxDQUFDLHVGQUFnQjtBQUNuRCxTQUFTLFVBQVUsR0FBRyxtQkFBTyxDQUFDLHFFQUFPO0FBQ3JDLFNBQVMsb0JBQW9CLEdBQUcsbUJBQU8sQ0FBQyxxRUFBTzs7QUFFL0M7QUFDQSw2Q0FBNkMsU0FBUyxLQUFLLDBCQUEwQjs7QUFFckYsU0FBUyxlQUFlOztBQUV4Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxrQkFBa0IsRUFBRTtBQUMvQixXQUFXLGlDQUFpQztBQUM1QztBQUNBLDREQUE0RCxxQkFBcUI7QUFDakY7QUFDQSxXQUFXLFFBQVE7O0FBRW5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsV0FBVztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsV0FBVyxRQUFRLFVBQVU7QUFDaEQ7QUFDQTtBQUNBLGtCQUFrQixXQUFXLFFBQVEsVUFBVTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxhQUFhLE9BQU8sR0FBRyxtQkFBTyxDQUFDLGlIQUE2QjtBQUM1RDtBQUNBLEtBQUs7QUFDTCxhQUFhLE9BQU8sR0FBRyxtQkFBTyxDQUFDLGlHQUFxQjtBQUNwRDtBQUNBOztBQUVBO0FBQ0EsYUFBYSxPQUFPLEdBQUcsbUJBQU8sQ0FBQyw2RkFBbUI7QUFDbEQ7QUFDQTs7QUFFQSxRQUFRLElBQVU7QUFDbEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSyxNQUFNLEVBRU47O0FBRUwsUUFBUSxLQUFpQyxFQUFFLEVBRXRDO0FBQ0w7QUFDQTs7QUFFQSxrQkFBa0IiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvY2xpZW50LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbi8qIGVzbGludC1kaXNhYmxlIGdsb2JhbC1yZXF1aXJlICovXG5jb25zdCBydW4gPSAoYnVpbGRIYXNoLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHsgYWRkcmVzcywgY2xpZW50ID0ge30sIHByb2dyZXNzLCBzZWN1cmUsIHN0YXR1cyB9ID0gb3B0aW9ucztcblxuICBvcHRpb25zLmZpcnN0SW5zdGFuY2UgPSAhd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXG4gIHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUgPSB3aW5kb3cud2VicGFja1BsdWdpblNlcnZlIHx8IHtcbiAgICBjb21waWxlcnM6IHt9XG4gIH07XG4gIHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUuc2lsZW50ID0gISFjbGllbnQuc2lsZW50O1xuXG4gIGNvbnN0IHsgQ2xpZW50U29ja2V0IH0gPSByZXF1aXJlKCcuL0NsaWVudFNvY2tldCcpO1xuICBjb25zdCB7IHJlcGxhY2UgfSA9IHJlcXVpcmUoJy4vaG1yJyk7XG4gIGNvbnN0IHsgZXJyb3IsIGluZm8sIHdhcm4gfSA9IHJlcXVpcmUoJy4vbG9nJykoKTtcblxuICBjb25zdCBwcm90b2NvbCA9IHNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgY29uc3Qgc29ja2V0ID0gbmV3IENsaWVudFNvY2tldChjbGllbnQsIGAke3Byb3RvY29sfTovLyR7Y2xpZW50LmFkZHJlc3MgfHwgYWRkcmVzc30vd3BzYCk7XG5cbiAgY29uc3QgeyBjb21waWxlck5hbWUgfSA9IG9wdGlvbnM7XG5cbiAgd2luZG93LndlYnBhY2tQbHVnaW5TZXJ2ZS5jb21waWxlcnNbY29tcGlsZXJOYW1lXSA9IHt9O1xuXG4gIC8vIHByZXZlbnRzIEVDT05OUkVTRVQgZXJyb3JzIG9uIHRoZSBzZXJ2ZXJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsICgpID0+IHNvY2tldC5jbG9zZSgpKTtcblxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgPSB7fSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuICAgIGNvbnN0IHsgZXJyb3JzLCBoYXNoID0gJzw/PicsIHdhcm5pbmdzIH0gPSBkYXRhIHx8IHt9O1xuICAgIGNvbnN0IHNob3J0SGFzaCA9IGhhc2guc2xpY2UoMCwgNyk7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IG9wdGlvbnMuY29tcGlsZXJOYW1lID8gYChDb21waWxlcjogJHtvcHRpb25zLmNvbXBpbGVyTmFtZX0pIGAgOiAnJztcbiAgICBjb25zdCBjb21waWxlciA9IHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmUuY29tcGlsZXJzW2NvbXBpbGVyTmFtZV07XG4gICAgY29uc3QgeyB3cHNJZCB9ID0gZGF0YTtcblxuICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICBjYXNlICdidWlsZCc6XG4gICAgICAgIGNvbXBpbGVyLmRvbmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjb25uZWN0ZWQnOlxuICAgICAgICBpbmZvKGBXZWJTb2NrZXQgY29ubmVjdGVkICR7aWRlbnRpZmllcn1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkb25lJzpcbiAgICAgICAgY29tcGlsZXIuZG9uZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJvYmxlbXMnOlxuICAgICAgICBpZiAoZGF0YS5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgZXJyb3IoYCR7aWRlbnRpZmllcn1CdWlsZCAke3Nob3J0SGFzaH0gcHJvZHVjZWQgZXJyb3JzOlxcbmAsIGVycm9ycyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRhdGEud2FybmluZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgd2FybihgJHtpZGVudGlmaWVyfUJ1aWxkICR7c2hvcnRIYXNofSBwcm9kdWNlZCB3YXJuaW5nczpcXG5gLCB3YXJuaW5ncyk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZWxvYWQnOlxuICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncmVwbGFjZSc6XG4gICAgICAgIC8vIGFjdGlvbnMgd2l0aCBhIHdwc0lkIGluIHRvdyBpbmRpY2F0ZSBhY3Rpb25zIHRoYXQgc2hvdWxkIG9ubHkgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgd3BzSWQgc2VudFxuICAgICAgICAvLyBtYXRjaGVzIHRoZSB3cHNJZCBzZXQgaW4gb3B0aW9ucy4gdGhpcyBpcyBob3cgd2UgY2FuIGlkZW50aWZ5IG11bHRpcGxlIGNvbXBpbGVycyBpbiB0aGVcbiAgICAgICAgLy8gY2xpZW50LlxuICAgICAgICBpZiAod3BzSWQgJiYgd3BzSWQgPT09IG9wdGlvbnMud3BzSWQpIHtcbiAgICAgICAgICByZXBsYWNlKGJ1aWxkSGFzaCwgaGFzaCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGlmIChwcm9ncmVzcyA9PT0gJ21pbmltYWwnKSB7XG4gICAgICBjb25zdCB7IGluaXQgfSA9IHJlcXVpcmUoJy4vb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbCcpO1xuICAgICAgaW5pdChvcHRpb25zLCBzb2NrZXQpO1xuICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MpIHtcbiAgICAgIGNvbnN0IHsgaW5pdCB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9wcm9ncmVzcycpO1xuICAgICAgaW5pdChvcHRpb25zLCBzb2NrZXQpO1xuICAgIH1cblxuICAgIGlmIChzdGF0dXMpIHtcbiAgICAgIGNvbnN0IHsgaW5pdCB9ID0gcmVxdWlyZSgnLi9vdmVybGF5cy9zdGF0dXMnKTtcbiAgICAgIGluaXQob3B0aW9ucywgc29ja2V0KTtcbiAgICB9XG5cbiAgICBpZiAobW9kdWxlLmhvdCkge1xuICAgICAgaW5mbygnSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBhY3RpdmUnKTtcblxuICAgICAgaWYgKG9wdGlvbnMubGl2ZVJlbG9hZCkge1xuICAgICAgICBpbmZvKCdMaXZlIFJlbG9hZCB0YWtpbmcgcHJlY2VkZW5jZSBvdmVyIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnQnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgd2FybignSG90IE1vZHVsZSBSZXBsYWNlbWVudCBpcyBpbmFjdGl2ZScpO1xuICAgIH1cblxuICAgIGlmICghbW9kdWxlLmhvdCAmJiBvcHRpb25zLmxpdmVSZWxvYWQpIHtcbiAgICAgIGluZm8oJ0xpdmUgUmVsb2FkIGlzIGFjdGl2ZScpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHJ1biB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/client.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/hmr.js":
/*!**************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/hmr.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, info, refresh, warn } = __webpack_require__(/*! ./log */ \"../node_modules/webpack-plugin-serve/lib/client/log.js\")();\n\nlet latest = true;\n\nconst hmr = {\n  onUnaccepted(data) {\n    warn('Change in unaccepted module(s):\\n', data);\n    warn(data);\n  },\n  onDeclined(data) {\n    warn('Change in declined module(s):\\n', data);\n  },\n  onErrored(data) {\n    error('Error in module(s):\\n', data);\n  }\n};\n\nconst replace = async (buildHash, hash) => {\n  const { apply, check, status } = module.hot;\n\n  if (hash) {\n    // eslint-disable-next-line no-undef\n    latest = hash.includes(buildHash);\n  }\n\n  if (!latest) {\n    const hmrStatus = status();\n\n    if (hmrStatus === 'abort' || hmrStatus === 'fail') {\n      warn(`An HMR update was triggered, but ${hmrStatus}ed. ${refresh}`);\n      return;\n    }\n\n    let modules;\n\n    try {\n      modules = await check(false);\n    } catch (e) {\n      // noop. this typically happens when a MultiCompiler has more than one compiler that includes\n      // this script, and an update happens with a hash that isn't part of the compiler/module this\n      // instance was loaded for.\n      return;\n    }\n\n    if (!modules) {\n      warn(`No modules found for replacement. ${refresh}`);\n      return;\n    }\n\n    modules = await apply(hmr);\n\n    if (modules) {\n      latest = true;\n      info(`Build ${hash.slice(0, 7)} replaced:\\n`, modules);\n    }\n  }\n};\n\nmodule.exports = { replace };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvaG1yLmpzP2M4YTQiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyw2QkFBNkIsR0FBRyxtQkFBTyxDQUFDLHFFQUFPOztBQUV0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyx1QkFBdUI7O0FBRWhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwrQ0FBK0MsVUFBVSxNQUFNLFFBQVE7QUFDdkU7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0QsUUFBUTtBQUN4RDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvQkFBb0IsaUJBQWlCO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvaG1yLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgQ29weXJpZ2h0IMKpIDIwMTggQW5kcmV3IFBvd2VsbFxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgZXJyb3IsIGluZm8sIHJlZnJlc2gsIHdhcm4gfSA9IHJlcXVpcmUoJy4vbG9nJykoKTtcblxubGV0IGxhdGVzdCA9IHRydWU7XG5cbmNvbnN0IGhtciA9IHtcbiAgb25VbmFjY2VwdGVkKGRhdGEpIHtcbiAgICB3YXJuKCdDaGFuZ2UgaW4gdW5hY2NlcHRlZCBtb2R1bGUocyk6XFxuJywgZGF0YSk7XG4gICAgd2FybihkYXRhKTtcbiAgfSxcbiAgb25EZWNsaW5lZChkYXRhKSB7XG4gICAgd2FybignQ2hhbmdlIGluIGRlY2xpbmVkIG1vZHVsZShzKTpcXG4nLCBkYXRhKTtcbiAgfSxcbiAgb25FcnJvcmVkKGRhdGEpIHtcbiAgICBlcnJvcignRXJyb3IgaW4gbW9kdWxlKHMpOlxcbicsIGRhdGEpO1xuICB9XG59O1xuXG5jb25zdCByZXBsYWNlID0gYXN5bmMgKGJ1aWxkSGFzaCwgaGFzaCkgPT4ge1xuICBjb25zdCB7IGFwcGx5LCBjaGVjaywgc3RhdHVzIH0gPSBtb2R1bGUuaG90O1xuXG4gIGlmIChoYXNoKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICAgbGF0ZXN0ID0gaGFzaC5pbmNsdWRlcyhidWlsZEhhc2gpO1xuICB9XG5cbiAgaWYgKCFsYXRlc3QpIHtcbiAgICBjb25zdCBobXJTdGF0dXMgPSBzdGF0dXMoKTtcblxuICAgIGlmIChobXJTdGF0dXMgPT09ICdhYm9ydCcgfHwgaG1yU3RhdHVzID09PSAnZmFpbCcpIHtcbiAgICAgIHdhcm4oYEFuIEhNUiB1cGRhdGUgd2FzIHRyaWdnZXJlZCwgYnV0ICR7aG1yU3RhdHVzfWVkLiAke3JlZnJlc2h9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IG1vZHVsZXM7XG5cbiAgICB0cnkge1xuICAgICAgbW9kdWxlcyA9IGF3YWl0IGNoZWNrKGZhbHNlKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBub29wLiB0aGlzIHR5cGljYWxseSBoYXBwZW5zIHdoZW4gYSBNdWx0aUNvbXBpbGVyIGhhcyBtb3JlIHRoYW4gb25lIGNvbXBpbGVyIHRoYXQgaW5jbHVkZXNcbiAgICAgIC8vIHRoaXMgc2NyaXB0LCBhbmQgYW4gdXBkYXRlIGhhcHBlbnMgd2l0aCBhIGhhc2ggdGhhdCBpc24ndCBwYXJ0IG9mIHRoZSBjb21waWxlci9tb2R1bGUgdGhpc1xuICAgICAgLy8gaW5zdGFuY2Ugd2FzIGxvYWRlZCBmb3IuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFtb2R1bGVzKSB7XG4gICAgICB3YXJuKGBObyBtb2R1bGVzIGZvdW5kIGZvciByZXBsYWNlbWVudC4gJHtyZWZyZXNofWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG1vZHVsZXMgPSBhd2FpdCBhcHBseShobXIpO1xuXG4gICAgaWYgKG1vZHVsZXMpIHtcbiAgICAgIGxhdGVzdCA9IHRydWU7XG4gICAgICBpbmZvKGBCdWlsZCAke2hhc2guc2xpY2UoMCwgNyl9IHJlcGxhY2VkOlxcbmAsIG1vZHVsZXMpO1xuICAgIH1cbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IHJlcGxhY2UgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/hmr.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/log.js":
/*!**************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/log.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { error, info, warn } = console;\nconst log = {\n  error: error.bind(console, '⬡ wps:'),\n  info: info.bind(console, '⬡ wps:'),\n  refresh: 'Please refresh the page',\n  warn: warn.bind(console, '⬡ wps:')\n};\nconst noop = () => {};\nconst silent = {\n  error: noop,\n  info: noop,\n  warn: noop\n};\n\nmodule.exports = () => (window.webpackPluginServe.silent ? silent : log);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvbG9nLmpzP2Y5NzciXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxvQkFBb0I7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBIiwiZmlsZSI6Ii4uL25vZGVfbW9kdWxlcy93ZWJwYWNrLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L2xvZy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGVycm9yLCBpbmZvLCB3YXJuIH0gPSBjb25zb2xlO1xuY29uc3QgbG9nID0ge1xuICBlcnJvcjogZXJyb3IuYmluZChjb25zb2xlLCAn4qyhIHdwczonKSxcbiAgaW5mbzogaW5mby5iaW5kKGNvbnNvbGUsICfirKEgd3BzOicpLFxuICByZWZyZXNoOiAnUGxlYXNlIHJlZnJlc2ggdGhlIHBhZ2UnLFxuICB3YXJuOiB3YXJuLmJpbmQoY29uc29sZSwgJ+KsoSB3cHM6Jylcbn07XG5jb25zdCBub29wID0gKCkgPT4ge307XG5jb25zdCBzaWxlbnQgPSB7XG4gIGVycm9yOiBub29wLFxuICBpbmZvOiBub29wLFxuICB3YXJuOiBub29wXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+ICh3aW5kb3cud2VicGFja1BsdWdpblNlcnZlLnNpbGVudCA/IHNpbGVudCA6IGxvZyk7XG4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/log.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js":
/*!************************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml } = __webpack_require__(/*! ./util */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress-minimal';\nconst html = `\n<div id=\"${ns}\" class=\"${ns}-hidden\">\n  <div id=\"${ns}-bar\"></div>\n</div>\n`;\nconst css = `\n#${ns} {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 4px;\n  width: 100vw;\n  z-index: 2147483645;\n}\n\n#${ns}-bar {\n  width: 0%;\n  height: 4px;\n  background-color: rgb(186, 223, 172);\n}\n\n@keyframes ${ns}-fade {\n\t0% {\n\t\topacity: 1;\n\t}\n\t100% {\n\t\topacity: 0;\n\t}\n}\n\n.${ns}-disappear {\n  animation: ${ns}-fade .3s;\n  animation-fill-mode: forwards;\n  animation-delay: .5s;\n}\n\n.${ns}-hidden {\n  display: none;\n}\n`;\n\nlet hideOnPageVisible = false;\n\nconst update = (percent) => {\n  const bar = document.querySelector(`#${ns}-bar`);\n  bar.style.width = `${percent}%`;\n};\n\nconst reset = (wrapper) => {\n  wrapper.classList.add(`${ns}-disappear`);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html);\n\n      const wrapper = document.querySelector(`#${ns}`);\n      wrapper.addEventListener('animationend', () => {\n        update(0);\n        wrapper.classList.add(`${ns}-hidden`);\n      });\n    });\n\n    document.addEventListener('visibilitychange', () => {\n      if (!document.hidden && hideOnPageVisible) {\n        const wrapper = document.querySelector(`#${ns}`);\n        reset(wrapper);\n        hideOnPageVisible = false;\n      }\n    });\n  }\n\n  socket.addEventListener('message', (message) => {\n    const { action, data } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const wrapper = document.querySelector(`#${ns}`);\n\n    wrapper.classList.remove(`${ns}-hidden`, `${ns}-disappear`);\n\n    if (data.percent === 1) {\n      if (document.hidden) {\n        hideOnPageVisible = true;\n      } else {\n        reset(wrapper);\n      }\n    } else {\n      hideOnPageVisible = false;\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = {\n  init\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbC5qcz82NjFjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU8sa0JBQWtCLEdBQUcsbUJBQU8sQ0FBQyxnRkFBUTs7QUFFNUM7QUFDQTtBQUNBLFdBQVcsR0FBRyxXQUFXLEdBQUc7QUFDNUIsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTixlQUFlLEdBQUc7QUFDbEI7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHlDQUF5QyxHQUFHO0FBQzVDLHVCQUF1QixRQUFRO0FBQy9COztBQUVBO0FBQ0EsMkJBQTJCLEdBQUc7QUFDOUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpREFBaUQsR0FBRztBQUNwRDtBQUNBO0FBQ0EsaUNBQWlDLEdBQUc7QUFDcEMsT0FBTztBQUNQLEtBQUs7O0FBRUw7QUFDQTtBQUNBLG1EQUFtRCxHQUFHO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLFdBQVcsZUFBZTs7QUFFMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0NBQStDLEdBQUc7O0FBRWxELGdDQUFnQyxHQUFHLGFBQWEsR0FBRzs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MtbWluaW1hbC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGwsIE1hdGhldXMgR29uw6dhbHZlcyBkYSBTaWx2YVxuXG4gIFRoaXMgU291cmNlIENvZGUgRm9ybSBpcyBzdWJqZWN0IHRvIHRoZSB0ZXJtcyBvZiB0aGUgTW96aWxsYSBQdWJsaWNcbiAgTGljZW5zZSwgdi4gMi4wLiBJZiBhIGNvcHkgb2YgdGhlIE1QTCB3YXMgbm90IGRpc3RyaWJ1dGVkIHdpdGggdGhpc1xuICBmaWxlLCBZb3UgY2FuIG9idGFpbiBvbmUgYXQgaHR0cDovL21vemlsbGEub3JnL01QTC8yLjAvLlxuXG4gIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG4gIGluY2x1ZGVkIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhpcyBTb3VyY2UgQ29kZSBGb3JtLlxuKi9cbmNvbnN0IHsgYWRkQ3NzLCBhZGRIdG1sIH0gPSByZXF1aXJlKCcuL3V0aWwnKTtcblxuY29uc3QgbnMgPSAnd3BzLXByb2dyZXNzLW1pbmltYWwnO1xuY29uc3QgaHRtbCA9IGBcbjxkaXYgaWQ9XCIke25zfVwiIGNsYXNzPVwiJHtuc30taGlkZGVuXCI+XG4gIDxkaXYgaWQ9XCIke25zfS1iYXJcIj48L2Rpdj5cbjwvZGl2PlxuYDtcbmNvbnN0IGNzcyA9IGBcbiMke25zfSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDRweDtcbiAgd2lkdGg6IDEwMHZ3O1xuICB6LWluZGV4OiAyMTQ3NDgzNjQ1O1xufVxuXG4jJHtuc30tYmFyIHtcbiAgd2lkdGg6IDAlO1xuICBoZWlnaHQ6IDRweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4NiwgMjIzLCAxNzIpO1xufVxuXG5Aa2V5ZnJhbWVzICR7bnN9LWZhZGUge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHQxMDAlIHtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG59XG5cbi4ke25zfS1kaXNhcHBlYXIge1xuICBhbmltYXRpb246ICR7bnN9LWZhZGUgLjNzO1xuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcbiAgYW5pbWF0aW9uLWRlbGF5OiAuNXM7XG59XG5cbi4ke25zfS1oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuYDtcblxubGV0IGhpZGVPblBhZ2VWaXNpYmxlID0gZmFsc2U7XG5cbmNvbnN0IHVwZGF0ZSA9IChwZXJjZW50KSA9PiB7XG4gIGNvbnN0IGJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1iYXJgKTtcbiAgYmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcbn07XG5cbmNvbnN0IHJlc2V0ID0gKHdyYXBwZXIpID0+IHtcbiAgd3JhcHBlci5jbGFzc0xpc3QuYWRkKGAke25zfS1kaXNhcHBlYXJgKTtcbn07XG5cbmNvbnN0IGluaXQgPSAob3B0aW9ucywgc29ja2V0KSA9PiB7XG4gIGlmIChvcHRpb25zLmZpcnN0SW5zdGFuY2UpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgYWRkQ3NzKGNzcyk7XG4gICAgICBhZGRIdG1sKGh0bWwpO1xuXG4gICAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG4gICAgICB3cmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgdXBkYXRlKDApO1xuICAgICAgICB3cmFwcGVyLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4ge1xuICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4gJiYgaGlkZU9uUGFnZVZpc2libGUpIHtcbiAgICAgICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuICAgICAgICByZXNldCh3cmFwcGVyKTtcbiAgICAgICAgaGlkZU9uUGFnZVZpc2libGUgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHNvY2tldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICBjb25zdCB7IGFjdGlvbiwgZGF0YSB9ID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xuXG4gICAgaWYgKGFjdGlvbiAhPT0gJ3Byb2dyZXNzJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBlcmNlbnQgPSBNYXRoLmZsb29yKGRhdGEucGVyY2VudCAqIDEwMCk7XG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuXG4gICAgd3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1oaWRkZW5gLCBgJHtuc30tZGlzYXBwZWFyYCk7XG5cbiAgICBpZiAoZGF0YS5wZXJjZW50ID09PSAxKSB7XG4gICAgICBpZiAoZG9jdW1lbnQuaGlkZGVuKSB7XG4gICAgICAgIGhpZGVPblBhZ2VWaXNpYmxlID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc2V0KHdyYXBwZXIpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlT25QYWdlVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZShwZXJjZW50KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/progress-minimal.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js":
/*!****************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell, Matheus Gonçalves da Silva\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml } = __webpack_require__(/*! ./util */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-progress';\nconst css = `\n#${ns}{\n  width: 200px;\n  height: 200px;\n  position: fixed;\n  right: 5%;\n  top: 5%;\n  transition: opacity .25s ease-in-out;\n  z-index: 2147483645;\n}\n\n#${ns}-bg {\n  fill: #282d35;\n}\n\n#${ns}-fill {\n  fill: rgba(0, 0, 0, 0);\n  stroke: rgb(186, 223, 172);\n  stroke-dasharray: 219.99078369140625;\n  stroke-dashoffset: -219.99078369140625;\n  stroke-width: 10;\n  transform: rotate(90deg)translate(0px, -80px);\n}\n\n#${ns}-percent {\n  font-family: 'Open Sans';\n  font-size: 18px;\n  fill: #ffffff;\n}\n\n#${ns}-percent-value {\n  dominant-baseline: middle;\n  text-anchor: middle;\n}\n\n#${ns}-percent-super {\n  fill: #bdc3c7;\n  font-size: .45em;\n  baseline-shift: 10%;\n}\n\n.${ns}-noselect {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -khtml-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  cursor: default;\n}\n\n@keyframes ${ns}-fade {\n\t0% {\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\t-webkit-transform: scale(1);\n\t}\n\t100% {\n\t\topacity: 0;\n\t\ttransform: scale(0);\n\t\t-webkit-transform: scale(0);\n\t}\n}\n\n.${ns}-disappear {\n  animation: ${ns}-fade .3s;\n  animation-fill-mode:forwards;\n  animation-delay: .5s;\n}\n\n.${ns}-hidden {\n  display: none;\n}\n\n/* Put google web font at the end, or you'll see FOUC in Firefox */\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n`;\n\nconst html = `\n<svg id=\"${ns}\" class=\"${ns}-noselect ${ns}-hidden\" x=\"0px\" y=\"0px\" viewBox=\"0 0 80 80\">\n  <circle id=\"${ns}-bg\" cx=\"50%\" cy=\"50%\" r=\"35\"></circle>\n  <path id=\"${ns}-fill\" d=\"M5,40a35,35 0 1,0 70,0a35,35 0 1,0 -70,0\" />\n  <text id=\"${ns}-percent\" x=\"50%\" y=\"51%\"><tspan id=\"${ns}-percent-value\">0</tspan><tspan id=\"${ns}-percent-super\">%</tspan></text>\n</svg>\n`;\n\nlet hideOnPageVisible = false;\n\nconst update = (percent) => {\n  const max = -219.99078369140625;\n  const value = document.querySelector(`#${ns}-percent-value`);\n  const track = document.querySelector(`#${ns}-fill`);\n  const offset = ((100 - percent) / 100) * max;\n\n  track.setAttribute('style', `stroke-dashoffset: ${offset}`);\n  value.innerHTML = percent.toString();\n};\n\nconst reset = (svg) => {\n  svg.classList.add(`${ns}-disappear`);\n};\n\nconst init = (options, socket) => {\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      addHtml(html);\n\n      // Reset progress to zero after disappear animation\n      const svg = document.querySelector(`#${ns}`);\n      svg.addEventListener('animationend', () => {\n        update(0);\n        svg.classList.add(`${ns}-hidden`);\n      });\n    });\n\n    document.addEventListener('visibilitychange', () => {\n      if (!document.hidden && hideOnPageVisible) {\n        const svg = document.querySelector(`#${ns}`);\n        reset(svg);\n        hideOnPageVisible = false;\n      }\n    });\n  }\n\n  socket.addEventListener('message', (message) => {\n    const { action, data } = JSON.parse(message.data);\n\n    if (action !== 'progress') {\n      return;\n    }\n\n    const percent = Math.floor(data.percent * 100);\n    const svg = document.querySelector(`#${ns}`);\n\n    if (!svg) {\n      return;\n    }\n\n    // we can safely call this even if it doesn't have the class\n    svg.classList.remove(`${ns}-disappear`, `${ns}-hidden`);\n\n    if (data.percent === 1) {\n      if (document.hidden) {\n        hideOnPageVisible = true;\n      } else {\n        reset(svg);\n      }\n    } else {\n      hideOnPageVisible = false;\n    }\n\n    update(percent);\n  });\n};\n\nmodule.exports = { init };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MuanM/MzFhMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPLGtCQUFrQixHQUFHLG1CQUFPLENBQUMsZ0ZBQVE7O0FBRTVDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGFBQWEsR0FBRztBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOLGVBQWUsR0FBRztBQUNsQjtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLEdBQUcsV0FBVyxHQUFHLFlBQVksR0FBRztBQUMzQyxnQkFBZ0IsR0FBRztBQUNuQixjQUFjLEdBQUc7QUFDakIsY0FBYyxHQUFHLHVDQUF1QyxHQUFHLHNDQUFzQyxHQUFHO0FBQ3BHO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQyxHQUFHO0FBQzlDLDJDQUEyQyxHQUFHO0FBQzlDOztBQUVBLG9EQUFvRCxPQUFPO0FBQzNEO0FBQ0E7O0FBRUE7QUFDQSx1QkFBdUIsR0FBRztBQUMxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLEdBQUc7QUFDaEQ7QUFDQTtBQUNBLDZCQUE2QixHQUFHO0FBQ2hDLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQSwrQ0FBK0MsR0FBRztBQUNsRDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxXQUFXLGVBQWU7O0FBRTFCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQyxHQUFHOztBQUU5QztBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsR0FBRyxnQkFBZ0IsR0FBRzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQSxrQkFBa0IiLCJmaWxlIjoiLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvcHJvZ3Jlc3MuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsLCBNYXRoZXVzIEdvbsOnYWx2ZXMgZGEgU2lsdmFcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGFkZENzcywgYWRkSHRtbCB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG5zID0gJ3dwcy1wcm9ncmVzcyc7XG5jb25zdCBjc3MgPSBgXG4jJHtuc317XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgcG9zaXRpb246IGZpeGVkO1xuICByaWdodDogNSU7XG4gIHRvcDogNSU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgLjI1cyBlYXNlLWluLW91dDtcbiAgei1pbmRleDogMjE0NzQ4MzY0NTtcbn1cblxuIyR7bnN9LWJnIHtcbiAgZmlsbDogIzI4MmQzNTtcbn1cblxuIyR7bnN9LWZpbGwge1xuICBmaWxsOiByZ2JhKDAsIDAsIDAsIDApO1xuICBzdHJva2U6IHJnYigxODYsIDIyMywgMTcyKTtcbiAgc3Ryb2tlLWRhc2hhcnJheTogMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBzdHJva2UtZGFzaG9mZnNldDogLTIxOS45OTA3ODM2OTE0MDYyNTtcbiAgc3Ryb2tlLXdpZHRoOiAxMDtcbiAgdHJhbnNmb3JtOiByb3RhdGUoOTBkZWcpdHJhbnNsYXRlKDBweCwgLTgwcHgpO1xufVxuXG4jJHtuc30tcGVyY2VudCB7XG4gIGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJztcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmaWxsOiAjZmZmZmZmO1xufVxuXG4jJHtuc30tcGVyY2VudC12YWx1ZSB7XG4gIGRvbWluYW50LWJhc2VsaW5lOiBtaWRkbGU7XG4gIHRleHQtYW5jaG9yOiBtaWRkbGU7XG59XG5cbiMke25zfS1wZXJjZW50LXN1cGVyIHtcbiAgZmlsbDogI2JkYzNjNztcbiAgZm9udC1zaXplOiAuNDVlbTtcbiAgYmFzZWxpbmUtc2hpZnQ6IDEwJTtcbn1cblxuLiR7bnN9LW5vc2VsZWN0IHtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0OiBub25lO1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAta2h0bWwtdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuQGtleWZyYW1lcyAke25zfS1mYWRlIHtcblx0MCUge1xuXHRcdG9wYWNpdHk6IDE7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgxKTtcblx0XHQtd2Via2l0LXRyYW5zZm9ybTogc2NhbGUoMSk7XG5cdH1cblx0MTAwJSB7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDApO1xuXHRcdC13ZWJraXQtdHJhbnNmb3JtOiBzY2FsZSgwKTtcblx0fVxufVxuXG4uJHtuc30tZGlzYXBwZWFyIHtcbiAgYW5pbWF0aW9uOiAke25zfS1mYWRlIC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgYW5pbWF0aW9uLWRlbGF5OiAuNXM7XG59XG5cbi4ke25zfS1oaWRkZW4ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4vKiBQdXQgZ29vZ2xlIHdlYiBmb250IGF0IHRoZSBlbmQsIG9yIHlvdSdsbCBzZWUgRk9VQyBpbiBGaXJlZm94ICovXG5AaW1wb3J0IHVybCgnaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PU9wZW4rU2Fuczo0MDAsNzAwJyk7XG5gO1xuXG5jb25zdCBodG1sID0gYFxuPHN2ZyBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1ub3NlbGVjdCAke25zfS1oaWRkZW5cIiB4PVwiMHB4XCIgeT1cIjBweFwiIHZpZXdCb3g9XCIwIDAgODAgODBcIj5cbiAgPGNpcmNsZSBpZD1cIiR7bnN9LWJnXCIgY3g9XCI1MCVcIiBjeT1cIjUwJVwiIHI9XCIzNVwiPjwvY2lyY2xlPlxuICA8cGF0aCBpZD1cIiR7bnN9LWZpbGxcIiBkPVwiTTUsNDBhMzUsMzUgMCAxLDAgNzAsMGEzNSwzNSAwIDEsMCAtNzAsMFwiIC8+XG4gIDx0ZXh0IGlkPVwiJHtuc30tcGVyY2VudFwiIHg9XCI1MCVcIiB5PVwiNTElXCI+PHRzcGFuIGlkPVwiJHtuc30tcGVyY2VudC12YWx1ZVwiPjA8L3RzcGFuPjx0c3BhbiBpZD1cIiR7bnN9LXBlcmNlbnQtc3VwZXJcIj4lPC90c3Bhbj48L3RleHQ+XG48L3N2Zz5cbmA7XG5cbmxldCBoaWRlT25QYWdlVmlzaWJsZSA9IGZhbHNlO1xuXG5jb25zdCB1cGRhdGUgPSAocGVyY2VudCkgPT4ge1xuICBjb25zdCBtYXggPSAtMjE5Ljk5MDc4MzY5MTQwNjI1O1xuICBjb25zdCB2YWx1ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1wZXJjZW50LXZhbHVlYCk7XG4gIGNvbnN0IHRyYWNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWZpbGxgKTtcbiAgY29uc3Qgb2Zmc2V0ID0gKCgxMDAgLSBwZXJjZW50KSAvIDEwMCkgKiBtYXg7XG5cbiAgdHJhY2suc2V0QXR0cmlidXRlKCdzdHlsZScsIGBzdHJva2UtZGFzaG9mZnNldDogJHtvZmZzZXR9YCk7XG4gIHZhbHVlLmlubmVySFRNTCA9IHBlcmNlbnQudG9TdHJpbmcoKTtcbn07XG5cbmNvbnN0IHJlc2V0ID0gKHN2ZykgPT4ge1xuICBzdmcuY2xhc3NMaXN0LmFkZChgJHtuc30tZGlzYXBwZWFyYCk7XG59O1xuXG5jb25zdCBpbml0ID0gKG9wdGlvbnMsIHNvY2tldCkgPT4ge1xuICBpZiAob3B0aW9ucy5maXJzdEluc3RhbmNlKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIGFkZENzcyhjc3MpO1xuICAgICAgYWRkSHRtbChodG1sKTtcblxuICAgICAgLy8gUmVzZXQgcHJvZ3Jlc3MgdG8gemVybyBhZnRlciBkaXNhcHBlYXIgYW5pbWF0aW9uXG4gICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc31gKTtcbiAgICAgIHN2Zy5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICAgIHVwZGF0ZSgwKTtcbiAgICAgICAgc3ZnLmNsYXNzTGlzdC5hZGQoYCR7bnN9LWhpZGRlbmApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgKCkgPT4ge1xuICAgICAgaWYgKCFkb2N1bWVudC5oaWRkZW4gJiYgaGlkZU9uUGFnZVZpc2libGUpIHtcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9YCk7XG4gICAgICAgIHJlc2V0KHN2Zyk7XG4gICAgICAgIGhpZGVPblBhZ2VWaXNpYmxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzb2NrZXQuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgY29uc3QgeyBhY3Rpb24sIGRhdGEgfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcblxuICAgIGlmIChhY3Rpb24gIT09ICdwcm9ncmVzcycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZXJjZW50ID0gTWF0aC5mbG9vcihkYXRhLnBlcmNlbnQgKiAxMDApO1xuICAgIGNvbnN0IHN2ZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfWApO1xuXG4gICAgaWYgKCFzdmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB3ZSBjYW4gc2FmZWx5IGNhbGwgdGhpcyBldmVuIGlmIGl0IGRvZXNuJ3QgaGF2ZSB0aGUgY2xhc3NcbiAgICBzdmcuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tZGlzYXBwZWFyYCwgYCR7bnN9LWhpZGRlbmApO1xuXG4gICAgaWYgKGRhdGEucGVyY2VudCA9PT0gMSkge1xuICAgICAgaWYgKGRvY3VtZW50LmhpZGRlbikge1xuICAgICAgICBoaWRlT25QYWdlVmlzaWJsZSA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNldChzdmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlT25QYWdlVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHVwZGF0ZShwZXJjZW50KTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgaW5pdCB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/progress.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/status.js":
/*!**************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/status.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst { addCss, addHtml, socketMessage } = __webpack_require__(/*! ./util */ \"../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\");\n\nconst ns = 'wps-status';\nconst css = `\n#${ns} {\n  background: #282d35;\n  border-radius: 0.6em;\n  display: flex;\n  flex-direction: column;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n\tfont-size: 10px;\n  height: 90%;\n  min-height: 20em;\n  left: 50%;\n  opacity: 1;\n  overflow: hidden;\n  padding-bottom: 3em;\n  position: absolute;\n  top: 2rem;\n  transform: translateX(-50%);\n  transition: opacity .25s ease-in-out;\n  width: 95%;\n  z-index: 2147483645;\n}\n\n@keyframes ${ns}-hidden-display {\n\t0% {\n\t\topacity: 1;\n\t}\n\t99% {\n\t\tdisplay: inline-flex;\n\t\topacity: 0;\n\t}\n\t100% {\n\t\tdisplay: none;\n\t\topacity: 0;\n\t}\n}\n\n#${ns}.${ns}-hidden {\n  animation: ${ns}-hidden-display .3s;\n  animation-fill-mode:forwards;\n  display: none;\n}\n\n#${ns}.${ns}-min {\n  animation: minimize 10s;\n  bottom: 2em;\n  cursor: pointer;\n  height: 6em;\n  left: auto;\n  min-height: 6em;\n  padding-bottom: 0;\n  position: absolute;\n  right: 2em;\n  top: auto;\n  transform: none;\n  width: 6em;\n}\n\n#${ns}.${ns}-min #${ns}-beacon {\n  display: block;\n}\n\n#${ns}-title {\n  color: #fff;\n  font-size: 1.2em;\n  font-weight: normal;\n  margin: 0;\n  padding: 0.6em 0;\n  text-align: center;\n  width: 100%;\n}\n\n#${ns}.${ns}-min #${ns}-title {\n  display: none;\n}\n\n#${ns}-title-errors {\n  color: #ff5f58;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-title-warnings {\n  color: #ffbd2e;\n  font-style: normal;\n  padding-left: 1em;\n}\n\n#${ns}-problems {\n  overflow-y: auto;\n  padding: 1em 2em;\n}\n\n#${ns}-problems pre {\n  color: #ddd;\n  background: #282d35;\n  display: block;\n  font-size: 1.3em;\n\tfont-family: 'Open Sans', Helvetica, Arial, sans-serif;\n  white-space: pre-wrap;\n}\n\n#${ns}-problems pre em {\n  background: #ff5f58;\n  border-radius: 0.3em;\n  color: #641e16;\n  font-style: normal;\n  line-height: 3em;\n  margin-right: 0.4em;\n  padding: 0.1em 0.4em;\n  text-transform: uppercase;\n}\n\npre#${ns}-warnings em {\n  background: #ffbd2e;\n  color: #3e2723;\n}\n\npre#${ns}-success {\n  display: none;\n  text-align: center;\n}\n\npre#${ns}-success em {\n  background: #7fb900;\n  color: #004d40;\n}\n\n#${ns}-problems.${ns}-success #${ns}-success {\n  display: block;\n}\n\n#${ns}.${ns}-min #${ns}-problems {\n  display: none;\n}\n\n#${ns}-nav {\n  opacity: 0.5;\n  padding: 1.2em;\n  position: absolute;\n}\n\n#${ns}.${ns}-min #${ns}-nav {\n  display: none;\n}\n\n#${ns}-nav:hover {\n  opacity: 1;\n}\n\n#${ns}-nav div {\n  background: #ff5f58;\n  border-radius: 1.2em;\n  cursor: pointer;\n  display: inline-block;\n  height: 1.2em;\n  position: relative;\n  width: 1.2em;\n}\n\ndiv#${ns}-min {\n  background: #ffbd2e;\n  margin-left: 0.8em;\n}\n\n#${ns}-beacon {\n  border-radius: 3em;\n  display: none;\n  font-size: 10px;\n  height: 3em;\n  margin: 1.6em auto;\n  position: relative;\n  width: 3em;\n}\n\n#${ns}-beacon:before, #${ns}-beacon:after {\n  content: '';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(127,185,0, 0.2);\n  border-radius: 3em;\n  opacity: 0;\n}\n\n#${ns}-beacon:before {\n  animation: ${ns}-pulse 3s infinite linear;\n  transform: scale(1);\n}\n\n#${ns}-beacon:after {\n  animation: ${ns}-pulse 3s 2s infinite linear;\n}\n\n\n@keyframes ${ns}-pulse {\n  0% {\n    opacity: 0;\n    transform: scale(0.6);\n  }\n  33% {\n    opacity: 1;\n    transform: scale(1);\n  }\n  100% {\n    opacity: 0;\n    transform: scale(1.4);\n  }\n}\n\n#${ns}-beacon mark {\n  background: rgba(127, 185, 0, 1);\n  border-radius: 100% 100%;\n  height: 1em;\n  left: 1em;\n  position: absolute;\n  top: 1em;\n  width: 1em;\n}\n\n#${ns}-beacon.${ns}-error mark {\n  background: #ff5f58;\n}\n\n#${ns}-beacon.${ns}-error:before, #${ns}-beacon.error:after {\n  background: rgba(255, 95, 88, 0.2);\n}\n\n#${ns}-beacon.${ns}-warning mark {\n  background: #ffbd2e;\n}\n\n#${ns}-beacon.${ns}-warning:before, #${ns}-beacon.warning:after {\n  background: rgba(255, 189, 46, 0.2);\n}\n\n/* Put google web font at the end, or you'll see FOUC in Firefox */\n@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700');\n`;\n\nconst html = `\n<aside id=\"${ns}\" class=\"${ns}-hidden\" title=\"build status\">\n  <figure id=\"${ns}-beacon\">\n    <mark/>\n  </figure>\n  <nav id=\"${ns}-nav\">\n    <div id=\"${ns}-close\" title=\"close\"></div>\n    <div id=\"${ns}-min\" title=\"minmize\"></div>\n  </nav>\n  <h1 id=\"${ns}-title\">\n    build status\n    <em id=\"${ns}-title-errors\"></em>\n    <em id=\"${ns}-title-warnings\"></em>\n  </h1>\n  <article id=\"${ns}-problems\">\n    <pre id=\"${ns}-success\"><em>Build Successful</em></pre>\n    <pre id=\"${ns}-errors\"></pre>\n    <pre id=\"${ns}-warnings\"></pre>\n  </article>\n</aside>\n`;\n\nconst init = (options, socket) => {\n  const hidden = `${ns}-hidden`;\n  let hasProblems = false;\n  let aside;\n  let beacon;\n  let problems;\n  let preErrors;\n  let preWarnings;\n  let titleErrors;\n  let titleWarnings;\n\n  const reset = () => {\n    preErrors.innerHTML = '';\n    preWarnings.innerHTML = '';\n    problems.classList.remove(`${ns}-success`);\n    beacon.className = '';\n    titleErrors.innerText = '';\n    titleWarnings.innerText = '';\n  };\n\n  const addErrors = (errors) => {\n    if (errors.length) {\n      problems.classList.remove(`${ns}-success`);\n      beacon.classList.add(`${ns}-error`);\n\n      for (const error of errors) {\n        const markup = `<div><em>Error</em> in ${error}</div>`;\n        addHtml(markup, preErrors);\n      }\n\n      titleErrors.innerText = `${errors.length} Error(s)`;\n    } else {\n      titleErrors.innerText = '';\n    }\n    aside.classList.remove(hidden);\n  };\n\n  const addWarnings = (warnings) => {\n    if (warnings.length) {\n      problems.classList.remove(`${ns}-success`);\n\n      if (!beacon.classList.contains(`${ns}-error`)) {\n        beacon.classList.add(`${ns}-warning`);\n      }\n\n      for (const warning of warnings) {\n        const markup = `<div><em>Warning</em> in ${warning}</div>`;\n        addHtml(markup, preWarnings);\n      }\n\n      titleWarnings.innerText = `${warnings.length} Warning(s)`;\n    } else {\n      titleWarnings.innerText = '';\n    }\n\n    aside.classList.remove(hidden);\n  };\n\n  if (options.firstInstance) {\n    document.addEventListener('DOMContentLoaded', () => {\n      addCss(css);\n      [aside] = addHtml(html);\n      beacon = document.querySelector(`#${ns}-beacon`);\n      problems = document.querySelector(`#${ns}-problems`);\n      preErrors = document.querySelector(`#${ns}-errors`);\n      preWarnings = document.querySelector(`#${ns}-warnings`);\n      titleErrors = document.querySelector(`#${ns}-title-errors`);\n      titleWarnings = document.querySelector(`#${ns}-title-warnings`);\n\n      const close = document.querySelector(`#${ns}-close`);\n      const min = document.querySelector(`#${ns}-min`);\n\n      aside.addEventListener('click', () => {\n        aside.classList.remove(`${ns}-min`);\n      });\n\n      close.addEventListener('click', () => {\n        aside.classList.add(`${ns}-hidden`);\n      });\n\n      min.addEventListener('click', (e) => {\n        aside.classList.add(`${ns}-min`);\n        e.stopImmediatePropagation();\n      });\n    });\n  }\n\n  socketMessage(socket, (action, data) => {\n    if (!aside) {\n      return;\n    }\n\n    const { compilers } = window.webpackPluginServe;\n\n    switch (action) {\n      case 'build':\n        // clear errors and warnings when a new build begins\n        reset();\n        break;\n      case 'problems':\n        addErrors(data.errors);\n        addWarnings(data.warnings);\n        aside.classList.remove(hidden);\n        hasProblems = data.errors.length || data.warnings.length;\n        break;\n      case 'replace':\n        // if there's a compiler that isn't done yet, hold off and let it run the show\n        for (const compilerName of Object.keys(compilers)) {\n          if (!compilers[compilerName]) {\n            return;\n          }\n        }\n\n        if (hasProblems && !preErrors.children.length && !preWarnings.children.length) {\n          reset();\n          hasProblems = false;\n          problems.classList.add(`${ns}-success`);\n          aside.classList.remove(hidden);\n\n          setTimeout(() => aside.classList.add(hidden), 3e3);\n        }\n        break;\n      default:\n    }\n  });\n};\n\nmodule.exports = { init };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvc3RhdHVzLmpzP2Q4MzEiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTyxpQ0FBaUMsR0FBRyxtQkFBTyxDQUFDLGdGQUFROztBQUUzRDtBQUNBO0FBQ0EsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ1osZUFBZSxHQUFHO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQSxHQUFHLEdBQUcsR0FBRyxHQUFHO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUc7QUFDdkI7QUFDQTs7QUFFQSxHQUFHLEdBQUc7QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRyxHQUFHLEdBQUcsUUFBUSxHQUFHO0FBQ3ZCO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRyxHQUFHO0FBQ047QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsR0FBRztBQUNOO0FBQ0E7QUFDQTtBQUNB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LE9BQU87O0FBRVA7QUFDQSwrQkFBK0IsR0FBRztBQUNsQyxPQUFPOztBQUVQO0FBQ0EsK0JBQStCLEdBQUc7QUFDbEM7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVcsWUFBWTs7QUFFdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxHQUFHO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCIiwiZmlsZSI6Ii4uL25vZGVfbW9kdWxlcy93ZWJwYWNrLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L292ZXJsYXlzL3N0YXR1cy5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gIENvcHlyaWdodCDCqSAyMDE4IEFuZHJldyBQb3dlbGxcblxuICBUaGlzIFNvdXJjZSBDb2RlIEZvcm0gaXMgc3ViamVjdCB0byB0aGUgdGVybXMgb2YgdGhlIE1vemlsbGEgUHVibGljXG4gIExpY2Vuc2UsIHYuIDIuMC4gSWYgYSBjb3B5IG9mIHRoZSBNUEwgd2FzIG5vdCBkaXN0cmlidXRlZCB3aXRoIHRoaXNcbiAgZmlsZSwgWW91IGNhbiBvYnRhaW4gb25lIGF0IGh0dHA6Ly9tb3ppbGxhLm9yZy9NUEwvMi4wLy5cblxuICBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoaXMgU291cmNlIENvZGUgRm9ybS5cbiovXG5jb25zdCB7IGFkZENzcywgYWRkSHRtbCwgc29ja2V0TWVzc2FnZSB9ID0gcmVxdWlyZSgnLi91dGlsJyk7XG5cbmNvbnN0IG5zID0gJ3dwcy1zdGF0dXMnO1xuY29uc3QgY3NzID0gYFxuIyR7bnN9IHtcbiAgYmFja2dyb3VuZDogIzI4MmQzNTtcbiAgYm9yZGVyLXJhZGl1czogMC42ZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdGZvbnQtZmFtaWx5OiAnT3BlbiBTYW5zJywgSGVsdmV0aWNhLCBBcmlhbCwgc2Fucy1zZXJpZjtcblx0Zm9udC1zaXplOiAxMHB4O1xuICBoZWlnaHQ6IDkwJTtcbiAgbWluLWhlaWdodDogMjBlbTtcbiAgbGVmdDogNTAlO1xuICBvcGFjaXR5OiAxO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nLWJvdHRvbTogM2VtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMnJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC01MCUpO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IC4yNXMgZWFzZS1pbi1vdXQ7XG4gIHdpZHRoOiA5NSU7XG4gIHotaW5kZXg6IDIxNDc0ODM2NDU7XG59XG5cbkBrZXlmcmFtZXMgJHtuc30taGlkZGVuLWRpc3BsYXkge1xuXHQwJSB7XG5cdFx0b3BhY2l0eTogMTtcblx0fVxuXHQ5OSUge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdG9wYWNpdHk6IDA7XG5cdH1cblx0MTAwJSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRvcGFjaXR5OiAwO1xuXHR9XG59XG5cbiMke25zfS4ke25zfS1oaWRkZW4ge1xuICBhbmltYXRpb246ICR7bnN9LWhpZGRlbi1kaXNwbGF5IC4zcztcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTpmb3J3YXJkcztcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiB7XG4gIGFuaW1hdGlvbjogbWluaW1pemUgMTBzO1xuICBib3R0b206IDJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBoZWlnaHQ6IDZlbTtcbiAgbGVmdDogYXV0bztcbiAgbWluLWhlaWdodDogNmVtO1xuICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMmVtO1xuICB0b3A6IGF1dG87XG4gIHRyYW5zZm9ybTogbm9uZTtcbiAgd2lkdGg6IDZlbTtcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tYmVhY29uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbiMke25zfS10aXRsZSB7XG4gIGNvbG9yOiAjZmZmO1xuICBmb250LXNpemU6IDEuMmVtO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAuNmVtIDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbiMke25zfS4ke25zfS1taW4gIyR7bnN9LXRpdGxlIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuIyR7bnN9LXRpdGxlLWVycm9ycyB7XG4gIGNvbG9yOiAjZmY1ZjU4O1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIHBhZGRpbmctbGVmdDogMWVtO1xufVxuXG4jJHtuc30tdGl0bGUtd2FybmluZ3Mge1xuICBjb2xvcjogI2ZmYmQyZTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBwYWRkaW5nLWxlZnQ6IDFlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgcGFkZGluZzogMWVtIDJlbTtcbn1cblxuIyR7bnN9LXByb2JsZW1zIHByZSB7XG4gIGNvbG9yOiAjZGRkO1xuICBiYWNrZ3JvdW5kOiAjMjgyZDM1O1xuICBkaXNwbGF5OiBibG9jaztcbiAgZm9udC1zaXplOiAxLjNlbTtcblx0Zm9udC1mYW1pbHk6ICdPcGVuIFNhbnMnLCBIZWx2ZXRpY2EsIEFyaWFsLCBzYW5zLXNlcmlmO1xuICB3aGl0ZS1zcGFjZTogcHJlLXdyYXA7XG59XG5cbiMke25zfS1wcm9ibGVtcyBwcmUgZW0ge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcbiAgY29sb3I6ICM2NDFlMTY7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDNlbTtcbiAgbWFyZ2luLXJpZ2h0OiAwLjRlbTtcbiAgcGFkZGluZzogMC4xZW0gMC40ZW07XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG59XG5cbnByZSMke25zfS13YXJuaW5ncyBlbSB7XG4gIGJhY2tncm91bmQ6ICNmZmJkMmU7XG4gIGNvbG9yOiAjM2UyNzIzO1xufVxuXG5wcmUjJHtuc30tc3VjY2VzcyB7XG4gIGRpc3BsYXk6IG5vbmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxucHJlIyR7bnN9LXN1Y2Nlc3MgZW0ge1xuICBiYWNrZ3JvdW5kOiAjN2ZiOTAwO1xuICBjb2xvcjogIzAwNGQ0MDtcbn1cblxuIyR7bnN9LXByb2JsZW1zLiR7bnN9LXN1Y2Nlc3MgIyR7bnN9LXN1Y2Nlc3Mge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuIyR7bnN9LiR7bnN9LW1pbiAjJHtuc30tcHJvYmxlbXMge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2IHtcbiAgb3BhY2l0eTogMC41O1xuICBwYWRkaW5nOiAxLjJlbTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xufVxuXG4jJHtuc30uJHtuc30tbWluICMke25zfS1uYXYge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4jJHtuc30tbmF2OmhvdmVyIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuIyR7bnN9LW5hdiBkaXYge1xuICBiYWNrZ3JvdW5kOiAjZmY1ZjU4O1xuICBib3JkZXItcmFkaXVzOiAxLjJlbTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGhlaWdodDogMS4yZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEuMmVtO1xufVxuXG5kaXYjJHtuc30tbWluIHtcbiAgYmFja2dyb3VuZDogI2ZmYmQyZTtcbiAgbWFyZ2luLWxlZnQ6IDAuOGVtO1xufVxuXG4jJHtuc30tYmVhY29uIHtcbiAgYm9yZGVyLXJhZGl1czogM2VtO1xuICBkaXNwbGF5OiBub25lO1xuICBmb250LXNpemU6IDEwcHg7XG4gIGhlaWdodDogM2VtO1xuICBtYXJnaW46IDEuNmVtIGF1dG87XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDNlbTtcbn1cblxuIyR7bnN9LWJlYWNvbjpiZWZvcmUsICMke25zfS1iZWFjb246YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LDE4NSwwLCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAzZW07XG4gIG9wYWNpdHk6IDA7XG59XG5cbiMke25zfS1iZWFjb246YmVmb3JlIHtcbiAgYW5pbWF0aW9uOiAke25zfS1wdWxzZSAzcyBpbmZpbml0ZSBsaW5lYXI7XG4gIHRyYW5zZm9ybTogc2NhbGUoMSk7XG59XG5cbiMke25zfS1iZWFjb246YWZ0ZXIge1xuICBhbmltYXRpb246ICR7bnN9LXB1bHNlIDNzIDJzIGluZmluaXRlIGxpbmVhcjtcbn1cblxuXG5Aa2V5ZnJhbWVzICR7bnN9LXB1bHNlIHtcbiAgMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjYpO1xuICB9XG4gIDMzJSB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICB9XG4gIDEwMCUge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjQpO1xuICB9XG59XG5cbiMke25zfS1iZWFjb24gbWFyayB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTI3LCAxODUsIDAsIDEpO1xuICBib3JkZXItcmFkaXVzOiAxMDAlIDEwMCU7XG4gIGhlaWdodDogMWVtO1xuICBsZWZ0OiAxZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAxZW07XG4gIHdpZHRoOiAxZW07XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3IgbWFyayB7XG4gIGJhY2tncm91bmQ6ICNmZjVmNTg7XG59XG5cbiMke25zfS1iZWFjb24uJHtuc30tZXJyb3I6YmVmb3JlLCAjJHtuc30tYmVhY29uLmVycm9yOmFmdGVyIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDk1LCA4OCwgMC4yKTtcbn1cblxuIyR7bnN9LWJlYWNvbi4ke25zfS13YXJuaW5nIG1hcmsge1xuICBiYWNrZ3JvdW5kOiAjZmZiZDJlO1xufVxuXG4jJHtuc30tYmVhY29uLiR7bnN9LXdhcm5pbmc6YmVmb3JlLCAjJHtuc30tYmVhY29uLndhcm5pbmc6YWZ0ZXIge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMTg5LCA0NiwgMC4yKTtcbn1cblxuLyogUHV0IGdvb2dsZSB3ZWIgZm9udCBhdCB0aGUgZW5kLCBvciB5b3UnbGwgc2VlIEZPVUMgaW4gRmlyZWZveCAqL1xuQGltcG9ydCB1cmwoJ2h0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzP2ZhbWlseT1PcGVuK1NhbnM6NDAwLDcwMCcpO1xuYDtcblxuY29uc3QgaHRtbCA9IGBcbjxhc2lkZSBpZD1cIiR7bnN9XCIgY2xhc3M9XCIke25zfS1oaWRkZW5cIiB0aXRsZT1cImJ1aWxkIHN0YXR1c1wiPlxuICA8ZmlndXJlIGlkPVwiJHtuc30tYmVhY29uXCI+XG4gICAgPG1hcmsvPlxuICA8L2ZpZ3VyZT5cbiAgPG5hdiBpZD1cIiR7bnN9LW5hdlwiPlxuICAgIDxkaXYgaWQ9XCIke25zfS1jbG9zZVwiIHRpdGxlPVwiY2xvc2VcIj48L2Rpdj5cbiAgICA8ZGl2IGlkPVwiJHtuc30tbWluXCIgdGl0bGU9XCJtaW5taXplXCI+PC9kaXY+XG4gIDwvbmF2PlxuICA8aDEgaWQ9XCIke25zfS10aXRsZVwiPlxuICAgIGJ1aWxkIHN0YXR1c1xuICAgIDxlbSBpZD1cIiR7bnN9LXRpdGxlLWVycm9yc1wiPjwvZW0+XG4gICAgPGVtIGlkPVwiJHtuc30tdGl0bGUtd2FybmluZ3NcIj48L2VtPlxuICA8L2gxPlxuICA8YXJ0aWNsZSBpZD1cIiR7bnN9LXByb2JsZW1zXCI+XG4gICAgPHByZSBpZD1cIiR7bnN9LXN1Y2Nlc3NcIj48ZW0+QnVpbGQgU3VjY2Vzc2Z1bDwvZW0+PC9wcmU+XG4gICAgPHByZSBpZD1cIiR7bnN9LWVycm9yc1wiPjwvcHJlPlxuICAgIDxwcmUgaWQ9XCIke25zfS13YXJuaW5nc1wiPjwvcHJlPlxuICA8L2FydGljbGU+XG48L2FzaWRlPlxuYDtcblxuY29uc3QgaW5pdCA9IChvcHRpb25zLCBzb2NrZXQpID0+IHtcbiAgY29uc3QgaGlkZGVuID0gYCR7bnN9LWhpZGRlbmA7XG4gIGxldCBoYXNQcm9ibGVtcyA9IGZhbHNlO1xuICBsZXQgYXNpZGU7XG4gIGxldCBiZWFjb247XG4gIGxldCBwcm9ibGVtcztcbiAgbGV0IHByZUVycm9ycztcbiAgbGV0IHByZVdhcm5pbmdzO1xuICBsZXQgdGl0bGVFcnJvcnM7XG4gIGxldCB0aXRsZVdhcm5pbmdzO1xuXG4gIGNvbnN0IHJlc2V0ID0gKCkgPT4ge1xuICAgIHByZUVycm9ycy5pbm5lckhUTUwgPSAnJztcbiAgICBwcmVXYXJuaW5ncy5pbm5lckhUTUwgPSAnJztcbiAgICBwcm9ibGVtcy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1zdWNjZXNzYCk7XG4gICAgYmVhY29uLmNsYXNzTmFtZSA9ICcnO1xuICAgIHRpdGxlRXJyb3JzLmlubmVyVGV4dCA9ICcnO1xuICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gJyc7XG4gIH07XG5cbiAgY29uc3QgYWRkRXJyb3JzID0gKGVycm9ycykgPT4ge1xuICAgIGlmIChlcnJvcnMubGVuZ3RoKSB7XG4gICAgICBwcm9ibGVtcy5jbGFzc0xpc3QucmVtb3ZlKGAke25zfS1zdWNjZXNzYCk7XG4gICAgICBiZWFjb24uY2xhc3NMaXN0LmFkZChgJHtuc30tZXJyb3JgKTtcblxuICAgICAgZm9yIChjb25zdCBlcnJvciBvZiBlcnJvcnMpIHtcbiAgICAgICAgY29uc3QgbWFya3VwID0gYDxkaXY+PGVtPkVycm9yPC9lbT4gaW4gJHtlcnJvcn08L2Rpdj5gO1xuICAgICAgICBhZGRIdG1sKG1hcmt1cCwgcHJlRXJyb3JzKTtcbiAgICAgIH1cblxuICAgICAgdGl0bGVFcnJvcnMuaW5uZXJUZXh0ID0gYCR7ZXJyb3JzLmxlbmd0aH0gRXJyb3IocylgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aXRsZUVycm9ycy5pbm5lclRleHQgPSAnJztcbiAgICB9XG4gICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICB9O1xuXG4gIGNvbnN0IGFkZFdhcm5pbmdzID0gKHdhcm5pbmdzKSA9PiB7XG4gICAgaWYgKHdhcm5pbmdzLmxlbmd0aCkge1xuICAgICAgcHJvYmxlbXMuY2xhc3NMaXN0LnJlbW92ZShgJHtuc30tc3VjY2Vzc2ApO1xuXG4gICAgICBpZiAoIWJlYWNvbi5jbGFzc0xpc3QuY29udGFpbnMoYCR7bnN9LWVycm9yYCkpIHtcbiAgICAgICAgYmVhY29uLmNsYXNzTGlzdC5hZGQoYCR7bnN9LXdhcm5pbmdgKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChjb25zdCB3YXJuaW5nIG9mIHdhcm5pbmdzKSB7XG4gICAgICAgIGNvbnN0IG1hcmt1cCA9IGA8ZGl2PjxlbT5XYXJuaW5nPC9lbT4gaW4gJHt3YXJuaW5nfTwvZGl2PmA7XG4gICAgICAgIGFkZEh0bWwobWFya3VwLCBwcmVXYXJuaW5ncyk7XG4gICAgICB9XG5cbiAgICAgIHRpdGxlV2FybmluZ3MuaW5uZXJUZXh0ID0gYCR7d2FybmluZ3MubGVuZ3RofSBXYXJuaW5nKHMpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGl0bGVXYXJuaW5ncy5pbm5lclRleHQgPSAnJztcbiAgICB9XG5cbiAgICBhc2lkZS5jbGFzc0xpc3QucmVtb3ZlKGhpZGRlbik7XG4gIH07XG5cbiAgaWYgKG9wdGlvbnMuZmlyc3RJbnN0YW5jZSkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICBhZGRDc3MoY3NzKTtcbiAgICAgIFthc2lkZV0gPSBhZGRIdG1sKGh0bWwpO1xuICAgICAgYmVhY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LWJlYWNvbmApO1xuICAgICAgcHJvYmxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tcHJvYmxlbXNgKTtcbiAgICAgIHByZUVycm9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1lcnJvcnNgKTtcbiAgICAgIHByZVdhcm5pbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bnN9LXdhcm5pbmdzYCk7XG4gICAgICB0aXRsZUVycm9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS10aXRsZS1lcnJvcnNgKTtcbiAgICAgIHRpdGxlV2FybmluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tdGl0bGUtd2FybmluZ3NgKTtcblxuICAgICAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtuc30tY2xvc2VgKTtcbiAgICAgIGNvbnN0IG1pbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke25zfS1taW5gKTtcblxuICAgICAgYXNpZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoYCR7bnN9LW1pbmApO1xuICAgICAgfSk7XG5cbiAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKGAke25zfS1oaWRkZW5gKTtcbiAgICAgIH0pO1xuXG4gICAgICBtaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBhc2lkZS5jbGFzc0xpc3QuYWRkKGAke25zfS1taW5gKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc29ja2V0TWVzc2FnZShzb2NrZXQsIChhY3Rpb24sIGRhdGEpID0+IHtcbiAgICBpZiAoIWFzaWRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBjb21waWxlcnMgfSA9IHdpbmRvdy53ZWJwYWNrUGx1Z2luU2VydmU7XG5cbiAgICBzd2l0Y2ggKGFjdGlvbikge1xuICAgICAgY2FzZSAnYnVpbGQnOlxuICAgICAgICAvLyBjbGVhciBlcnJvcnMgYW5kIHdhcm5pbmdzIHdoZW4gYSBuZXcgYnVpbGQgYmVnaW5zXG4gICAgICAgIHJlc2V0KCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJvYmxlbXMnOlxuICAgICAgICBhZGRFcnJvcnMoZGF0YS5lcnJvcnMpO1xuICAgICAgICBhZGRXYXJuaW5ncyhkYXRhLndhcm5pbmdzKTtcbiAgICAgICAgYXNpZGUuY2xhc3NMaXN0LnJlbW92ZShoaWRkZW4pO1xuICAgICAgICBoYXNQcm9ibGVtcyA9IGRhdGEuZXJyb3JzLmxlbmd0aCB8fCBkYXRhLndhcm5pbmdzLmxlbmd0aDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXBsYWNlJzpcbiAgICAgICAgLy8gaWYgdGhlcmUncyBhIGNvbXBpbGVyIHRoYXQgaXNuJ3QgZG9uZSB5ZXQsIGhvbGQgb2ZmIGFuZCBsZXQgaXQgcnVuIHRoZSBzaG93XG4gICAgICAgIGZvciAoY29uc3QgY29tcGlsZXJOYW1lIG9mIE9iamVjdC5rZXlzKGNvbXBpbGVycykpIHtcbiAgICAgICAgICBpZiAoIWNvbXBpbGVyc1tjb21waWxlck5hbWVdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhc1Byb2JsZW1zICYmICFwcmVFcnJvcnMuY2hpbGRyZW4ubGVuZ3RoICYmICFwcmVXYXJuaW5ncy5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICByZXNldCgpO1xuICAgICAgICAgIGhhc1Byb2JsZW1zID0gZmFsc2U7XG4gICAgICAgICAgcHJvYmxlbXMuY2xhc3NMaXN0LmFkZChgJHtuc30tc3VjY2Vzc2ApO1xuICAgICAgICAgIGFzaWRlLmNsYXNzTGlzdC5yZW1vdmUoaGlkZGVuKTtcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXNpZGUuY2xhc3NMaXN0LmFkZChoaWRkZW4pLCAzZTMpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGluaXQgfTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/status.js\n");

/***/ }),

/***/ "../node_modules/webpack-plugin-serve/lib/client/overlays/util.js":
/*!************************************************************************!*\
  !*** ../node_modules/webpack-plugin-serve/lib/client/overlays/util.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n  Copyright © 2018 Andrew Powell\n\n  This Source Code Form is subject to the terms of the Mozilla Public\n  License, v. 2.0. If a copy of the MPL was not distributed with this\n  file, You can obtain one at http://mozilla.org/MPL/2.0/.\n\n  The above copyright notice and this permission notice shall be\n  included in all copies or substantial portions of this Source Code Form.\n*/\nconst addHtml = (html, parent) => {\n  const div = document.createElement('div');\n  const nodes = [];\n\n  div.innerHTML = html.trim();\n\n  while (div.firstChild) {\n    nodes.push((parent || document.body).appendChild(div.firstChild));\n  }\n\n  return nodes;\n};\n\nconst addCss = (css) => {\n  const style = document.createElement('style');\n\n  style.type = 'text/css';\n\n  if (css.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    style.appendChild(document.createTextNode(css));\n  }\n\n  // append the stylesheet for the svg\n  document.head.appendChild(style);\n};\n\nconst socketMessage = (socket, handler) => {\n  socket.addEventListener('message', (message) => {\n    const { action, data = {} } = JSON.parse(message.data);\n    handler(action, data);\n  });\n};\n\nmodule.exports = { addCss, addHtml, socketMessage };\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3dlYnBhY2stcGx1Z2luLXNlcnZlL2xpYi9jbGllbnQvb3ZlcmxheXMvdXRpbC5qcz84ZmJjIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsa0JBQWtCLEVBQUU7QUFDL0I7QUFDQSxHQUFHO0FBQ0g7O0FBRUEsa0JBQWtCIiwiZmlsZSI6Ii4uL25vZGVfbW9kdWxlcy93ZWJwYWNrLXBsdWdpbi1zZXJ2ZS9saWIvY2xpZW50L292ZXJsYXlzL3V0aWwuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICBDb3B5cmlnaHQgwqkgMjAxOCBBbmRyZXcgUG93ZWxsXG5cbiAgVGhpcyBTb3VyY2UgQ29kZSBGb3JtIGlzIHN1YmplY3QgdG8gdGhlIHRlcm1zIG9mIHRoZSBNb3ppbGxhIFB1YmxpY1xuICBMaWNlbnNlLCB2LiAyLjAuIElmIGEgY29weSBvZiB0aGUgTVBMIHdhcyBub3QgZGlzdHJpYnV0ZWQgd2l0aCB0aGlzXG4gIGZpbGUsIFlvdSBjYW4gb2J0YWluIG9uZSBhdCBodHRwOi8vbW96aWxsYS5vcmcvTVBMLzIuMC8uXG5cbiAgVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmVcbiAgaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGlzIFNvdXJjZSBDb2RlIEZvcm0uXG4qL1xuY29uc3QgYWRkSHRtbCA9IChodG1sLCBwYXJlbnQpID0+IHtcbiAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGNvbnN0IG5vZGVzID0gW107XG5cbiAgZGl2LmlubmVySFRNTCA9IGh0bWwudHJpbSgpO1xuXG4gIHdoaWxlIChkaXYuZmlyc3RDaGlsZCkge1xuICAgIG5vZGVzLnB1c2goKHBhcmVudCB8fCBkb2N1bWVudC5ib2R5KS5hcHBlbmRDaGlsZChkaXYuZmlyc3RDaGlsZCkpO1xuICB9XG5cbiAgcmV0dXJuIG5vZGVzO1xufTtcblxuY29uc3QgYWRkQ3NzID0gKGNzcykgPT4ge1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG5cbiAgaWYgKGNzcy5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG5cbiAgLy8gYXBwZW5kIHRoZSBzdHlsZXNoZWV0IGZvciB0aGUgc3ZnXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufTtcblxuY29uc3Qgc29ja2V0TWVzc2FnZSA9IChzb2NrZXQsIGhhbmRsZXIpID0+IHtcbiAgc29ja2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAobWVzc2FnZSkgPT4ge1xuICAgIGNvbnN0IHsgYWN0aW9uLCBkYXRhID0ge30gfSA9IEpTT04ucGFyc2UobWVzc2FnZS5kYXRhKTtcbiAgICBoYW5kbGVyKGFjdGlvbiwgZGF0YSk7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7IGFkZENzcywgYWRkSHRtbCwgc29ja2V0TWVzc2FnZSB9O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///../node_modules/webpack-plugin-serve/lib/client/overlays/util.js\n");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/style.scss */ \"./sass/style.scss\");\n/* harmony import */ var _sass_style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _snake__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./snake */ \"./js/snake.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  // snake\n  window.Snake = new _snake__WEBPACK_IMPORTED_MODULE_1__[\"default\"](document.getElementById('snake'));\n  document.getElementById('play-snake').addEventListener('click', function (e) {\n    e.preventDefault();\n    window.Snake.countdown();\n  });\n  document.getElementById('replay-snake').addEventListener('click', function (e) {\n    e.preventDefault();\n    window.Snake.init();\n  });\n  document.getElementById('stop-snake').addEventListener('click', function (e) {\n    e.preventDefault();\n    window.Snake.done();\n  });\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9pbmRleC5qcz9lZTFjIl0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIndpbmRvdyIsIlNuYWtlIiwiZ2V0RWxlbWVudEJ5SWQiLCJlIiwicHJldmVudERlZmF1bHQiLCJjb3VudGRvd24iLCJpbml0IiwiZG9uZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRUFBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQVc7QUFDdkQ7QUFDQUMsUUFBTSxDQUFDQyxLQUFQLEdBQWUsSUFBSUEsOENBQUosQ0FBVUgsUUFBUSxDQUFDSSxjQUFULENBQXdCLE9BQXhCLENBQVYsQ0FBZjtBQUVBSixVQUFRLENBQUNJLGNBQVQsQ0FBd0IsWUFBeEIsRUFBc0NILGdCQUF0QyxDQUF1RCxPQUF2RCxFQUFnRSxVQUFTSSxDQUFULEVBQVk7QUFDMUVBLEtBQUMsQ0FBQ0MsY0FBRjtBQUNBSixVQUFNLENBQUNDLEtBQVAsQ0FBYUksU0FBYjtBQUNELEdBSEQ7QUFLQVAsVUFBUSxDQUFDSSxjQUFULENBQXdCLGNBQXhCLEVBQXdDSCxnQkFBeEMsQ0FBeUQsT0FBekQsRUFBa0UsVUFBU0ksQ0FBVCxFQUFZO0FBQzVFQSxLQUFDLENBQUNDLGNBQUY7QUFDQUosVUFBTSxDQUFDQyxLQUFQLENBQWFLLElBQWI7QUFDRCxHQUhEO0FBS0FSLFVBQVEsQ0FBQ0ksY0FBVCxDQUF3QixZQUF4QixFQUFzQ0gsZ0JBQXRDLENBQXVELE9BQXZELEVBQWdFLFVBQVNJLENBQVQsRUFBWTtBQUMxRUEsS0FBQyxDQUFDQyxjQUFGO0FBQ0FKLFVBQU0sQ0FBQ0MsS0FBUCxDQUFhTSxJQUFiO0FBQ0QsR0FIRDtBQUlELENBbEJEIiwiZmlsZSI6Ii4vanMvaW5kZXguanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3Nhc3Mvc3R5bGUuc2Nzcyc7XG5pbXBvcnQgU25ha2UgZnJvbSAnLi9zbmFrZSc7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHtcbiAgLy8gc25ha2VcbiAgd2luZG93LlNuYWtlID0gbmV3IFNuYWtlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbmFrZScpKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheS1zbmFrZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB3aW5kb3cuU25ha2UuY291bnRkb3duKCk7XG4gIH0pO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXBsYXktc25ha2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgd2luZG93LlNuYWtlLmluaXQoKTtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0b3Atc25ha2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgd2luZG93LlNuYWtlLmRvbmUoKTtcbiAgfSk7XG59KTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./js/index.js\n");

/***/ }),

/***/ "./js/snake.js":
/*!*********************!*\
  !*** ./js/snake.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Snake; });\nclass Snake {\n  constructor(element) {\n    this.element = element;\n    this.canvas = element.getElementsByTagName('canvas')[0];\n    this.setupCanvas();\n    this.setupGrid();\n    this.beginModal = element.getElementsByClassName('snake-begin-modal')[0];\n    this.endModal = element.getElementsByClassName('snake-end-modal')[0];\n    this.hiScore = element.getElementsByClassName('snake-hi-score')[0];\n    this.keyIsPressed = false;\n    this.baseSpeed = 8;\n    this.speedGainPerLevel = 4;\n    this.then = Date.now();\n    this.snakeArray;\n    this.direction, this.food;\n    this.score, this.level, this.speed;\n    this.now, this.then, this.elapsed, this.msPerFrame;\n    this.playing = false;\n    this.attachControls();\n  }\n\n  done() {\n    this.beginModal.classList.add('invisible');\n    this.endModal.classList.add('invisible');\n    this.ctx.clearRect(0, 0, this.width, this.height);\n  }\n\n  countdown() {\n    if (this.playing) return;\n    this.playing = true;\n    this.beginModal.classList.remove('invisible');\n    const text = [3, 2, 1, 'Go!'];\n    setTimeout(() => {\n      this.init();\n    }, 1e3 * text.length + 1);\n\n    for (let i = 0; i < text.length; i++) {\n      setTimeout(() => {\n        this.beginModal.textContent = text[i];\n      }, 1e3 * i);\n    }\n  }\n\n  getColor(color) {\n    return window.getComputedStyle(this.element.getElementsByClassName(color)[0]).color;\n  }\n\n  setupGrid() {\n    const idealCell = {\n      width: 20,\n      height: 20\n    };\n    const gridWidth = Math.round(this.width / idealCell.width);\n    const cellWidth = this.width / gridWidth;\n    const gridHeight = Math.round(this.height / idealCell.height);\n    const cellHeight = this.height / gridHeight;\n    const slots = [];\n\n    for (let i = 0; i < gridWidth; i++) {\n      for (let j = 0; j < gridHeight; j++) {\n        slots.push({\n          x: i,\n          y: j\n        });\n      }\n    }\n\n    this.grid = {\n      slots,\n      width: gridWidth,\n      height: gridHeight,\n      cell: {\n        width: cellWidth,\n        height: cellHeight\n      }\n    };\n  }\n\n  setupCanvas() {\n    const dpr = window.devicePixelRatio || 1;\n    const rect = this.canvas.getBoundingClientRect();\n    const rectWidth = rect.width;\n    const rectHeight = rect.height;\n    this.canvas.width = rectWidth * dpr;\n    this.canvas.height = rectHeight * dpr;\n    this.canvas.style.width = rectWidth + 'px';\n    this.canvas.style.height = rectHeight + 'px';\n    this.ctx = this.canvas.getContext('2d');\n    this.ctx.scale(dpr, dpr);\n    this.width = rectWidth;\n    this.height = rectHeight;\n  }\n\n  init() {\n    this.beginModal.classList.add('invisible');\n    this.endModal.classList.add('invisible');\n    this.playing = true;\n    this.direction = \"right\";\n    this.score = 0;\n    this.level = 0;\n    this.increaseLevel();\n    this.createSnake();\n    this.createFood();\n    this.loop = requestAnimationFrame(() => this.paint());\n  }\n\n  increaseLevel() {\n    this.level += 1;\n    this.speed = this.baseSpeed + this.level * this.speedGainPerLevel;\n    this.msPerFrame = 1000 / this.speed;\n  }\n\n  createSnake() {\n    this.snakeArray = [];\n    const length = 5;\n    const center = {\n      x: ~~(this.grid.width / 2),\n      y: ~~(this.grid.height / 2)\n    };\n\n    for (let i = length - 1; i >= 0; i--) {\n      this.snakeArray.push({\n        x: center.x + i,\n        y: center.y\n      });\n    }\n  }\n\n  getAvailableSlots() {\n    const availableSlots = [];\n\n    for (let i = 0; i < this.grid.slots.length; i++) {\n      const slot = this.grid.slots[i];\n\n      for (let s = 0; s < this.snakeArray.length; s++) {\n        const snake = this.snakeArray[s];\n\n        if (snake.x != slot.x && snake.y != slot.y) {\n          availableSlots.push(slot);\n        }\n      }\n    }\n\n    return availableSlots;\n  }\n\n  createFood() {\n    const slots = this.getAvailableSlots();\n    this.food = slots[~~(Math.random() * (slots.length - 1))];\n  }\n\n  blowUp(cell) {\n    cancelAnimationFrame(this.loop);\n\n    for (let i = cell; i < this.snakeArray.length; i++) {\n      this.paintCell(this.snakeArray[i].x, this.snakeArray[i].y, this.getColor('snake-cell-color'));\n    }\n\n    if (cell != this.snakeArray.length) {\n      this.paintCell(this.snakeArray[cell].x, this.snakeArray[cell].y, this.getColor('snake-dead-color'));\n      setTimeout(() => {\n        this.blowUp(cell + 1);\n      }, 20);\n    } else {\n      let txt = \"Weak.\";\n      if (this.score >= 10 && this.score < 20) txt = \"Srsly?\";\n      if (this.score >= 20 && this.score < 30) txt = \"Not bad!\";\n      if (this.score >= 30 && this.score < 40) txt = \"Awesome!\";\n      if (this.score >= 40 && this.score < 50) txt = \"Insane!\";\n      if (this.score >= 50 && this.score < 60) txt = \"Wicked!\";\n      if (this.score >= 60 && this.score < 70) txt = \"Outstanding!\";\n      if (this.score >= 70) txt = \"Get a life.\";\n      this.hiScore.textContent = txt + \" Hi score: \" + this.score;\n      this.endModal.classList.remove('invisible');\n      this.playing = false;\n    }\n  }\n\n  paint() {\n    this.now = Date.now();\n    this.elapsed = this.now - this.then;\n\n    if (this.elapsed > this.msPerFrame) {\n      this.then = this.now - this.elapsed % this.msPerFrame;\n      this.ctx.clearRect(0, 0, this.width, this.height);\n      let nx = this.snakeArray[0].x;\n      let ny = this.snakeArray[0].y;\n      if (this.direction == \"right\") nx++;else if (this.direction == \"left\") nx--;else if (this.direction == \"up\") ny--;else if (this.direction == \"down\") ny++;\n\n      if (nx <= -1 || nx >= this.grid.width || ny <= -1 || ny >= this.grid.height || this.checkCollision(nx, ny, this.snakeArray)) {\n        // Game over\n        this.blowUp(0);\n        return;\n      }\n\n      let tail;\n\n      if (nx == this.food.x && ny == this.food.y) {\n        tail = {\n          x: nx,\n          y: ny\n        };\n        this.score++;\n        if (!(this.score % 10)) this.increaseLevel();\n        this.createFood();\n      } else {\n        tail = this.snakeArray.pop();\n        tail.x = nx;\n        tail.y = ny;\n      }\n\n      this.snakeArray.unshift(tail);\n\n      for (let i = 0; i < this.snakeArray.length; i++) {\n        this.paintCell(this.snakeArray[i].x, this.snakeArray[i].y, this.getColor('snake-cell-color'));\n      }\n\n      this.paintCell(this.food.x, this.food.y, this.getColor('snake-food-color'));\n      const scoreText = \"Level: \" + this.level + \" Score: \" + this.score;\n      this.ctx.font = 'normal 12pt Menlo, Consolas, Courier';\n      this.ctx.textAlign = 'left';\n      this.ctx.fillStyle = this.getColor('snake-text-color');\n      this.ctx.fillText(scoreText, 5, this.height - 5);\n      this.keyIsPressed = false;\n    }\n\n    this.loop = requestAnimationFrame(() => this.paint());\n  }\n\n  paintCell(x, y, color) {\n    this.ctx.fillStyle = color;\n    this.ctx.fillRect(x * this.grid.cell.width, y * this.grid.cell.height, this.grid.cell.width, this.grid.cell.height);\n    this.ctx.strokeStyle = this.getColor('snake-border-color');\n    this.ctx.strokeRect(x * this.grid.cell.width, y * this.grid.cell.height, this.grid.cell.width, this.grid.cell.height);\n  }\n\n  checkCollision(x, y, array) {\n    for (let i = 0; i < array.length; i++) {\n      if (array[i].x == x && array[i].y == y) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  reverse() {\n    const tail = this.snakeArray.length - 1;\n    if (this.snakeArray[tail].x < this.snakeArray[tail - 1].x) this.direction = 'left';else if (this.snakeArray[tail].x > this.snakeArray[tail - 1].x) this.direction = 'right';else if (this.snakeArray[tail].y < this.snakeArray[tail - 1].y) this.direction = 'up';else if (this.snakeArray[tail].y > this.snakeArray[tail - 1].y) this.direction = 'down';\n    this.snakeArray.reverse();\n  }\n\n  attachControls() {\n    document.addEventListener('keydown', e => {\n      const key = e.keyCode;\n\n      if (!this.keyIsPressed) {\n        if (key == 37 && this.direction != \"right\") this.direction = \"left\";else if (key == 38 && this.direction != \"down\") this.direction = \"up\";else if (key == 39 && this.direction != \"left\") this.direction = \"right\";else if (key == 40 && this.direction != \"up\") this.direction = \"down\";else if (key == 67) this.reverse();\n      }\n\n      if ([37, 38, 39, 40, 67].includes(key)) {\n        e.preventDefault();\n        this.keyIsPressed = true;\n      }\n    });\n  }\n\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9zbmFrZS5qcz9mOGMyIl0sIm5hbWVzIjpbIlNuYWtlIiwiY29uc3RydWN0b3IiLCJlbGVtZW50IiwiY2FudmFzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJzZXR1cENhbnZhcyIsInNldHVwR3JpZCIsImJlZ2luTW9kYWwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZW5kTW9kYWwiLCJoaVNjb3JlIiwia2V5SXNQcmVzc2VkIiwiYmFzZVNwZWVkIiwic3BlZWRHYWluUGVyTGV2ZWwiLCJ0aGVuIiwiRGF0ZSIsIm5vdyIsInNuYWtlQXJyYXkiLCJkaXJlY3Rpb24iLCJmb29kIiwic2NvcmUiLCJsZXZlbCIsInNwZWVkIiwiZWxhcHNlZCIsIm1zUGVyRnJhbWUiLCJwbGF5aW5nIiwiYXR0YWNoQ29udHJvbHMiLCJkb25lIiwiY2xhc3NMaXN0IiwiYWRkIiwiY3R4IiwiY2xlYXJSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJjb3VudGRvd24iLCJyZW1vdmUiLCJ0ZXh0Iiwic2V0VGltZW91dCIsImluaXQiLCJsZW5ndGgiLCJpIiwidGV4dENvbnRlbnQiLCJnZXRDb2xvciIsImNvbG9yIiwid2luZG93IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImlkZWFsQ2VsbCIsImdyaWRXaWR0aCIsIk1hdGgiLCJyb3VuZCIsImNlbGxXaWR0aCIsImdyaWRIZWlnaHQiLCJjZWxsSGVpZ2h0Iiwic2xvdHMiLCJqIiwicHVzaCIsIngiLCJ5IiwiZ3JpZCIsImNlbGwiLCJkcHIiLCJkZXZpY2VQaXhlbFJhdGlvIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3RXaWR0aCIsInJlY3RIZWlnaHQiLCJzdHlsZSIsImdldENvbnRleHQiLCJzY2FsZSIsImluY3JlYXNlTGV2ZWwiLCJjcmVhdGVTbmFrZSIsImNyZWF0ZUZvb2QiLCJsb29wIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwicGFpbnQiLCJjZW50ZXIiLCJnZXRBdmFpbGFibGVTbG90cyIsImF2YWlsYWJsZVNsb3RzIiwic2xvdCIsInMiLCJzbmFrZSIsInJhbmRvbSIsImJsb3dVcCIsImNhbmNlbEFuaW1hdGlvbkZyYW1lIiwicGFpbnRDZWxsIiwidHh0IiwibngiLCJueSIsImNoZWNrQ29sbGlzaW9uIiwidGFpbCIsInBvcCIsInVuc2hpZnQiLCJzY29yZVRleHQiLCJmb250IiwidGV4dEFsaWduIiwiZmlsbFN0eWxlIiwiZmlsbFRleHQiLCJmaWxsUmVjdCIsInN0cm9rZVN0eWxlIiwic3Ryb2tlUmVjdCIsImFycmF5IiwicmV2ZXJzZSIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJrZXkiLCJrZXlDb2RlIiwiaW5jbHVkZXMiLCJwcmV2ZW50RGVmYXVsdCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFlLE1BQU1BLEtBQU4sQ0FBWTtBQUN6QkMsYUFBVyxDQUFDQyxPQUFELEVBQVU7QUFDbkIsU0FBS0EsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsU0FBS0MsTUFBTCxHQUFjRCxPQUFPLENBQUNFLG9CQUFSLENBQTZCLFFBQTdCLEVBQXVDLENBQXZDLENBQWQ7QUFDQSxTQUFLQyxXQUFMO0FBQ0EsU0FBS0MsU0FBTDtBQUVBLFNBQUtDLFVBQUwsR0FBa0JMLE9BQU8sQ0FBQ00sc0JBQVIsQ0FBK0IsbUJBQS9CLEVBQW9ELENBQXBELENBQWxCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQlAsT0FBTyxDQUFDTSxzQkFBUixDQUErQixpQkFBL0IsRUFBa0QsQ0FBbEQsQ0FBaEI7QUFDQSxTQUFLRSxPQUFMLEdBQWVSLE9BQU8sQ0FBQ00sc0JBQVIsQ0FBK0IsZ0JBQS9CLEVBQWlELENBQWpELENBQWY7QUFFQSxTQUFLRyxZQUFMLEdBQW9CLEtBQXBCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCLENBQXpCO0FBQ0EsU0FBS0MsSUFBTCxHQUFZQyxJQUFJLENBQUNDLEdBQUwsRUFBWjtBQUNBLFNBQUtDLFVBQUw7QUFF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Q0ksY0FBRjtBQUNBLGFBQUtqRyxZQUFMLEdBQW9CLElBQXBCO0FBQ0Q7QUFDRixLQWZEO0FBZ0JEOztBQW5Sd0IiLCJmaWxlIjoiLi9qcy9zbmFrZS5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNuYWtlIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5jYW52YXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdjYW52YXMnKVswXTtcbiAgICB0aGlzLnNldHVwQ2FudmFzKCk7XG4gICAgdGhpcy5zZXR1cEdyaWQoKTtcblxuICAgIHRoaXMuYmVnaW5Nb2RhbCA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc25ha2UtYmVnaW4tbW9kYWwnKVswXTtcbiAgICB0aGlzLmVuZE1vZGFsID0gZWxlbWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbmFrZS1lbmQtbW9kYWwnKVswXTtcbiAgICB0aGlzLmhpU2NvcmUgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NuYWtlLWhpLXNjb3JlJylbMF07XG5cbiAgICB0aGlzLmtleUlzUHJlc3NlZCA9IGZhbHNlO1xuICAgIHRoaXMuYmFzZVNwZWVkID0gODtcbiAgICB0aGlzLnNwZWVkR2FpblBlckxldmVsID0gNDtcbiAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuc25ha2VBcnJheTtcblxuICAgIHRoaXMuZGlyZWN0aW9uLCB0aGlzLmZvb2Q7XG5cbiAgICB0aGlzLnNjb3JlLCB0aGlzLmxldmVsLCB0aGlzLnNwZWVkO1xuICAgIHRoaXMubm93LCB0aGlzLnRoZW4sIHRoaXMuZWxhcHNlZCwgdGhpcy5tc1BlckZyYW1lO1xuXG4gICAgdGhpcy5wbGF5aW5nID0gZmFsc2U7XG5cbiAgICB0aGlzLmF0dGFjaENvbnRyb2xzKCk7XG4gIH1cblxuICBkb25lKCkge1xuICAgIHRoaXMuYmVnaW5Nb2RhbC5jbGFzc0xpc3QuYWRkKCdpbnZpc2libGUnKTtcbiAgICB0aGlzLmVuZE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cblxuICBjb3VudGRvd24oKSB7XG4gICAgaWYgKHRoaXMucGxheWluZykgcmV0dXJuO1xuXG4gICAgdGhpcy5wbGF5aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmJlZ2luTW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaW52aXNpYmxlJyk7XG4gICAgY29uc3QgdGV4dCA9IFszLCAyLCAxLCAnR28hJ107XG5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH0sIDFlMyAqIHRleHQubGVuZ3RoICsgMSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLmJlZ2luTW9kYWwudGV4dENvbnRlbnQgPSB0ZXh0W2ldO1xuICAgICAgfSwgMWUzICogaSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q29sb3IoY29sb3IpIHtcbiAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY29sb3IpWzBdKS5jb2xvcjtcbiAgfVxuXG4gIHNldHVwR3JpZCgpIHtcbiAgICBjb25zdCBpZGVhbENlbGwgPSB7IHdpZHRoOiAyMCwgaGVpZ2h0OiAyMCB9O1xuXG4gICAgY29uc3QgZ3JpZFdpZHRoID0gTWF0aC5yb3VuZCh0aGlzLndpZHRoIC8gaWRlYWxDZWxsLndpZHRoKTtcbiAgICBjb25zdCBjZWxsV2lkdGggPSB0aGlzLndpZHRoIC8gZ3JpZFdpZHRoO1xuXG4gICAgY29uc3QgZ3JpZEhlaWdodCA9IE1hdGgucm91bmQodGhpcy5oZWlnaHQgLyBpZGVhbENlbGwuaGVpZ2h0KTtcbiAgICBjb25zdCBjZWxsSGVpZ2h0ID0gdGhpcy5oZWlnaHQgLyBncmlkSGVpZ2h0O1xuXG4gICAgY29uc3Qgc2xvdHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyaWRXaWR0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGdyaWRIZWlnaHQ7IGorKykge1xuICAgICAgICBzbG90cy5wdXNoKHsgeDogaSwgeTogaiB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmdyaWQgPSB7XG4gICAgICBzbG90cyxcbiAgICAgIHdpZHRoOiBncmlkV2lkdGgsXG4gICAgICBoZWlnaHQ6IGdyaWRIZWlnaHQsXG4gICAgICBjZWxsOiB7XG4gICAgICAgIHdpZHRoOiBjZWxsV2lkdGgsXG4gICAgICAgIGhlaWdodDogY2VsbEhlaWdodCxcbiAgICAgIH0sXG4gICAgfVxuICB9XG5cbiAgc2V0dXBDYW52YXMoKSB7XG4gICAgY29uc3QgZHByID0gd2luZG93LmRldmljZVBpeGVsUmF0aW8gfHwgMTtcbiAgICBjb25zdCByZWN0ID0gdGhpcy5jYW52YXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgY29uc3QgcmVjdFdpZHRoID0gcmVjdC53aWR0aDtcbiAgICBjb25zdCByZWN0SGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG5cbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHJlY3RXaWR0aCAqIGRwcjtcbiAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSByZWN0SGVpZ2h0ICogZHByO1xuICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gcmVjdFdpZHRoICsgJ3B4JztcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSByZWN0SGVpZ2h0ICsgJ3B4JztcblxuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLmN0eC5zY2FsZShkcHIsIGRwcik7XG5cbiAgICB0aGlzLndpZHRoID0gcmVjdFdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gcmVjdEhlaWdodDtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5iZWdpbk1vZGFsLmNsYXNzTGlzdC5hZGQoJ2ludmlzaWJsZScpO1xuICAgIHRoaXMuZW5kTW9kYWwuY2xhc3NMaXN0LmFkZCgnaW52aXNpYmxlJyk7XG4gICAgdGhpcy5wbGF5aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IFwicmlnaHRcIjtcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmxldmVsID0gMDtcbiAgICB0aGlzLmluY3JlYXNlTGV2ZWwoKTtcbiAgICB0aGlzLmNyZWF0ZVNuYWtlKCk7XG4gICAgdGhpcy5jcmVhdGVGb29kKCk7XG4gICAgdGhpcy5sb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMucGFpbnQoKSk7XG4gIH1cblxuICBpbmNyZWFzZUxldmVsKCkge1xuICAgIHRoaXMubGV2ZWwgKz0gMTtcbiAgICB0aGlzLnNwZWVkID0gdGhpcy5iYXNlU3BlZWQgKyB0aGlzLmxldmVsICogdGhpcy5zcGVlZEdhaW5QZXJMZXZlbDtcbiAgICB0aGlzLm1zUGVyRnJhbWUgPSAxMDAwIC8gdGhpcy5zcGVlZDtcbiAgfVxuXG4gIGNyZWF0ZVNuYWtlKCkge1xuICAgIHRoaXMuc25ha2VBcnJheSA9IFtdO1xuICAgIGNvbnN0IGxlbmd0aCA9IDU7XG4gICAgY29uc3QgY2VudGVyID0ge1xuICAgICAgeDogfn4odGhpcy5ncmlkLndpZHRoIC8gMiksXG4gICAgICB5OiB+fih0aGlzLmdyaWQuaGVpZ2h0IC8gMiksXG4gICAgfVxuICAgIGZvcihsZXQgaSA9IGxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0aGlzLnNuYWtlQXJyYXkucHVzaCh7IHg6IGNlbnRlci54ICsgaSwgeTogY2VudGVyLnkgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0QXZhaWxhYmxlU2xvdHMoKSB7XG4gICAgY29uc3QgYXZhaWxhYmxlU2xvdHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZC5zbG90cy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3Qgc2xvdCA9IHRoaXMuZ3JpZC5zbG90c1tpXTtcbiAgICAgIGZvciAobGV0IHMgPSAwOyBzIDwgdGhpcy5zbmFrZUFycmF5Lmxlbmd0aDsgcysrKSB7XG4gICAgICAgIGNvbnN0IHNuYWtlID0gdGhpcy5zbmFrZUFycmF5W3NdO1xuICAgICAgICBpZiAoc25ha2UueCAhPSBzbG90LnggJiYgc25ha2UueSAhPSBzbG90LnkpIHtcbiAgICAgICAgICBhdmFpbGFibGVTbG90cy5wdXNoKHNsb3QpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhdmFpbGFibGVTbG90cztcbiAgfVxuXG4gIGNyZWF0ZUZvb2QoKSB7XG4gICAgY29uc3Qgc2xvdHMgPSB0aGlzLmdldEF2YWlsYWJsZVNsb3RzKCk7XG4gICAgdGhpcy5mb29kID0gc2xvdHNbfn4oTWF0aC5yYW5kb20oKSAqIChzbG90cy5sZW5ndGggLSAxKSldO1xuICB9XG5cbiAgYmxvd1VwKGNlbGwpIHtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApO1xuXG4gICAgZm9yIChsZXQgaSA9IGNlbGw7IGkgPCB0aGlzLnNuYWtlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMucGFpbnRDZWxsKHRoaXMuc25ha2VBcnJheVtpXS54LCB0aGlzLnNuYWtlQXJyYXlbaV0ueSwgdGhpcy5nZXRDb2xvcignc25ha2UtY2VsbC1jb2xvcicpKTtcbiAgICB9XG5cbiAgICBpZiAoY2VsbCAhPSB0aGlzLnNuYWtlQXJyYXkubGVuZ3RoKSB7XG4gICAgICB0aGlzLnBhaW50Q2VsbCh0aGlzLnNuYWtlQXJyYXlbY2VsbF0ueCwgdGhpcy5zbmFrZUFycmF5W2NlbGxdLnksIHRoaXMuZ2V0Q29sb3IoJ3NuYWtlLWRlYWQtY29sb3InKSk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5ibG93VXAoY2VsbCArIDEpO1xuICAgICAgfSwgMjApO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgIGxldCB0eHQgPSBcIldlYWsuXCI7XG4gICAgICBpZiAodGhpcy5zY29yZSA+PSAxMCAmJiB0aGlzLnNjb3JlIDwgMjApIHR4dCA9IFwiU3JzbHk/XCJcbiAgICAgIGlmICh0aGlzLnNjb3JlID49IDIwICYmIHRoaXMuc2NvcmUgPCAzMCkgdHh0ID0gXCJOb3QgYmFkIVwiXG4gICAgICBpZiAodGhpcy5zY29yZSA+PSAzMCAmJiB0aGlzLnNjb3JlIDwgNDApIHR4dCA9IFwiQXdlc29tZSFcIlxuICAgICAgaWYgKHRoaXMuc2NvcmUgPj0gNDAgJiYgdGhpcy5zY29yZSA8IDUwKSB0eHQgPSBcIkluc2FuZSFcIlxuICAgICAgaWYgKHRoaXMuc2NvcmUgPj0gNTAgJiYgdGhpcy5zY29yZSA8IDYwKSB0eHQgPSBcIldpY2tlZCFcIlxuICAgICAgaWYgKHRoaXMuc2NvcmUgPj0gNjAgJiYgdGhpcy5zY29yZSA8IDcwKSB0eHQgPSBcIk91dHN0YW5kaW5nIVwiXG4gICAgICBpZiAodGhpcy5zY29yZSA+PSA3MCkgdHh0ID0gXCJHZXQgYSBsaWZlLlwiXG4gICAgICB0aGlzLmhpU2NvcmUudGV4dENvbnRlbnQgPSAodHh0ICsgXCIgSGkgc2NvcmU6IFwiICsgdGhpcy5zY29yZSk7XG4gICAgICB0aGlzLmVuZE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2ludmlzaWJsZScpO1xuXG4gICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwYWludCgpIHtcbiAgICB0aGlzLm5vdyA9IERhdGUubm93KCk7XG4gICAgdGhpcy5lbGFwc2VkID0gdGhpcy5ub3cgLSB0aGlzLnRoZW47XG4gICAgaWYgKHRoaXMuZWxhcHNlZCA+IHRoaXMubXNQZXJGcmFtZSkge1xuICAgICAgdGhpcy50aGVuID0gdGhpcy5ub3cgLSAodGhpcy5lbGFwc2VkICUgdGhpcy5tc1BlckZyYW1lKTtcbiAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG5cbiAgICAgIGxldCBueCA9IHRoaXMuc25ha2VBcnJheVswXS54O1xuICAgICAgbGV0IG55ID0gdGhpcy5zbmFrZUFycmF5WzBdLnk7XG5cbiAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBcInJpZ2h0XCIpIG54Kys7XG4gICAgICBlbHNlIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBcImxlZnRcIikgbngtLTtcbiAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IFwidXBcIikgbnktLTtcbiAgICAgIGVsc2UgaWYgKHRoaXMuZGlyZWN0aW9uID09IFwiZG93blwiKSBueSsrO1xuXG4gICAgICBpZiAobnggPD0gLTFcbiAgICAgICAgICB8fCBueCA+PSB0aGlzLmdyaWQud2lkdGhcbiAgICAgICAgICB8fCBueSA8PSAtMVxuICAgICAgICAgIHx8IG55ID49IHRoaXMuZ3JpZC5oZWlnaHRcbiAgICAgICAgICB8fCB0aGlzLmNoZWNrQ29sbGlzaW9uKG54LCBueSwgdGhpcy5zbmFrZUFycmF5KSkge1xuICAgICAgICAvLyBHYW1lIG92ZXJcbiAgICAgICAgdGhpcy5ibG93VXAoMCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHRhaWw7XG4gICAgICBpZiAobnggPT0gdGhpcy5mb29kLnggJiYgbnkgPT0gdGhpcy5mb29kLnkpIHtcbiAgICAgICAgdGFpbCA9IHsgeDogbngsIHk6IG55IH07XG4gICAgICAgIHRoaXMuc2NvcmUrKztcbiAgICAgICAgaWYgKCEodGhpcy5zY29yZSAlIDEwKSkgdGhpcy5pbmNyZWFzZUxldmVsKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9vZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFpbCA9IHRoaXMuc25ha2VBcnJheS5wb3AoKTtcbiAgICAgICAgdGFpbC54ID0gbng7IHRhaWwueSA9IG55O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnNuYWtlQXJyYXkudW5zaGlmdCh0YWlsKTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNuYWtlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGhpcy5wYWludENlbGwodGhpcy5zbmFrZUFycmF5W2ldLngsIHRoaXMuc25ha2VBcnJheVtpXS55LCB0aGlzLmdldENvbG9yKCdzbmFrZS1jZWxsLWNvbG9yJykpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBhaW50Q2VsbCh0aGlzLmZvb2QueCwgdGhpcy5mb29kLnksIHRoaXMuZ2V0Q29sb3IoJ3NuYWtlLWZvb2QtY29sb3InKSk7XG4gICAgICBjb25zdCBzY29yZVRleHQgPSBcIkxldmVsOiBcIiArIHRoaXMubGV2ZWwgKyBcIiBTY29yZTogXCIgKyB0aGlzLnNjb3JlO1xuICAgICAgdGhpcy5jdHguZm9udCA9ICdub3JtYWwgMTJwdCBNZW5sbywgQ29uc29sYXMsIENvdXJpZXInO1xuICAgICAgdGhpcy5jdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy5nZXRDb2xvcignc25ha2UtdGV4dC1jb2xvcicpO1xuICAgICAgdGhpcy5jdHguZmlsbFRleHQoc2NvcmVUZXh0LCA1LCB0aGlzLmhlaWdodCAtIDUpO1xuICAgICAgdGhpcy5rZXlJc1ByZXNzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLmxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5wYWludCgpKTtcbiAgfVxuXG4gIHBhaW50Q2VsbCh4LCB5LCBjb2xvcikge1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIHRoaXMuY3R4LmZpbGxSZWN0KHggKiB0aGlzLmdyaWQuY2VsbC53aWR0aCwgeSAqIHRoaXMuZ3JpZC5jZWxsLmhlaWdodCwgdGhpcy5ncmlkLmNlbGwud2lkdGgsIHRoaXMuZ3JpZC5jZWxsLmhlaWdodCk7XG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLmdldENvbG9yKCdzbmFrZS1ib3JkZXItY29sb3InKTtcbiAgICB0aGlzLmN0eC5zdHJva2VSZWN0KHggKiB0aGlzLmdyaWQuY2VsbC53aWR0aCwgeSAqIHRoaXMuZ3JpZC5jZWxsLmhlaWdodCwgdGhpcy5ncmlkLmNlbGwud2lkdGgsIHRoaXMuZ3JpZC5jZWxsLmhlaWdodCk7XG4gIH1cblxuICBjaGVja0NvbGxpc2lvbih4LCB5LCBhcnJheSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhcnJheVtpXS54ID09IHggJiYgYXJyYXlbaV0ueSA9PSB5KSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXZlcnNlKCkge1xuICAgIGNvbnN0IHRhaWwgPSB0aGlzLnNuYWtlQXJyYXkubGVuZ3RoIC0gMTtcbiAgICBpZiAodGhpcy5zbmFrZUFycmF5W3RhaWxdLnggPCB0aGlzLnNuYWtlQXJyYXlbdGFpbC0xXS54KSB0aGlzLmRpcmVjdGlvbiA9ICdsZWZ0JztcbiAgICBlbHNlIGlmICh0aGlzLnNuYWtlQXJyYXlbdGFpbF0ueCA+IHRoaXMuc25ha2VBcnJheVt0YWlsLTFdLngpIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcbiAgICBlbHNlIGlmICh0aGlzLnNuYWtlQXJyYXlbdGFpbF0ueSA8IHRoaXMuc25ha2VBcnJheVt0YWlsLTFdLnkpIHRoaXMuZGlyZWN0aW9uID0gJ3VwJztcbiAgICBlbHNlIGlmICh0aGlzLnNuYWtlQXJyYXlbdGFpbF0ueSA+IHRoaXMuc25ha2VBcnJheVt0YWlsLTFdLnkpIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xuICAgIHRoaXMuc25ha2VBcnJheS5yZXZlcnNlKCk7XG4gIH1cblxuICBhdHRhY2hDb250cm9scygpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGNvbnN0IGtleSA9IGUua2V5Q29kZTtcblxuICAgICAgaWYgKCF0aGlzLmtleUlzUHJlc3NlZCkge1xuICAgICAgICBpZiAoa2V5ID09IDM3ICYmIHRoaXMuZGlyZWN0aW9uICE9IFwicmlnaHRcIikgdGhpcy5kaXJlY3Rpb24gPSBcImxlZnRcIjtcbiAgICAgICAgZWxzZSBpZihrZXkgPT0gMzggJiYgdGhpcy5kaXJlY3Rpb24gIT0gXCJkb3duXCIpIHRoaXMuZGlyZWN0aW9uID0gXCJ1cFwiO1xuICAgICAgICBlbHNlIGlmKGtleSA9PSAzOSAmJiB0aGlzLmRpcmVjdGlvbiAhPSBcImxlZnRcIikgdGhpcy5kaXJlY3Rpb24gPSBcInJpZ2h0XCI7XG4gICAgICAgIGVsc2UgaWYoa2V5ID09IDQwICYmIHRoaXMuZGlyZWN0aW9uICE9IFwidXBcIikgdGhpcy5kaXJlY3Rpb24gPSBcImRvd25cIjtcbiAgICAgICAgZWxzZSBpZihrZXkgPT0gNjcpIHRoaXMucmV2ZXJzZSgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoWzM3LCAzOCwgMzksIDQwLCA2N10uaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMua2V5SXNQcmVzc2VkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./js/snake.js\n");

/***/ }),

/***/ "./sass/style.scss":
/*!*************************!*\
  !*** ./sass/style.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zYXNzL3N0eWxlLnNjc3M/MGEyZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSIsImZpbGUiOiIuL3Nhc3Mvc3R5bGUuc2Nzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./sass/style.scss\n");

/***/ }),

/***/ 0:
/*!*******************************************************!*\
  !*** multi ./js/index.js webpack-plugin-serve/client ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./js/index.js */"./js/index.js");
module.exports = __webpack_require__(/*! webpack-plugin-serve/client */"../node_modules/webpack-plugin-serve/client.js");


/***/ })

/******/ });