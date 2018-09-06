!function() {
    var t, e, r, n;
    for (i in t = {
        SERVER_PV_URL: window.location.protocol + "//pv.csdn.net/csdnbi",
        SERVER_RE_URL: window.location.protocol + "//re.csdn.net/csdnbi"
    },
    n = {
        headers: {
            component: "enter",
            datatype: "pv",
            version: "v1"
        },
        body: {}
    },
    r = {
        buildReqParam: function(e, t) {
            var a = {
                re: t
            };
            return "[" + JSON.stringify($.extend(n, {
                headers: {
                    component: "enterprise",
                    datatype: e,
                    version: "v1"
                },
                body: JSON.stringify(a)
            })) + "]"
        },
        serverUrl: function(e) {
            return "track" == e ? t.SERVER_PV_URL: t.SERVER_RE_URL
        }
    },
    e = {
        trackReport: function(e, t) {
            var a = r.buildReqParam(e, t);
            $.ajax({
                url: r.serverUrl(e),
                type: "POST",
                async: !0,
                crossDomain: !0,
                xhrFields: {
                    withCredentials: !0
                },
                contentType: "text/plain;charset=UTF-8",
                data: a,
                success: function() {},
                error: function() {}
            })
        }
    },
    void 0 === window.csdn && (window.csdn = {}), e) window.csdn[i] = e[i]
} (),
function(d, c) {
    var host_info = document.domain,
    prefix_domain = "";
    host_info.match(/^beta*/) ? prefix_domain = "beta": host_info.match(/^l[a-z]*/) && (prefix_domain = "l");
    var currentProtocol = window.location.protocol,
    host_http = currentProtocol + "//" + prefix_domain + "ads.csdn.net/",
    a = "8c38e720de1c90a6f6ff52f3f89c4d57";
    if (c.reviveAsync = c.reviveAsync || {},
    !c.reviveAsync.hasOwnProperty(a)) {
        f = c.reviveAsync[a] = {
            id: Object.keys(c.reviveAsync).length,
            name: "revive",
            start: function() {
                var e = function() {
                    try {
                        f.done || (d.removeEventListener("DOMContentLoaded", e, !1), c.removeEventListener("load", e, !1), f.done = !0, f.apply(f.detect()))
                    } catch(e) {
                        console.log(e)
                    }
                };
                "complete" === d.readyState ? setTimeout(e) : (d.addEventListener("DOMContentLoaded", e, !1), c.addEventListener("load", e, !1))
            },
            ajax: function(e, t) {},
            encode: function(e, t) {
                var a, r, n = [];
                for (a in e) if (e.hasOwnProperty(a)) {
                    var i = t ? t + "[" + a + "]": a;
                    if (/string|number|boolean/.test(typeof e[a])) n.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[a]));
                    else {
                        var o = f.encode(e[a], i);
                        for (r in o) n.push(o[r])
                    }
                }
                return n
            },
            apply: function(e) {
                var t = e[0];
                if (t.zones.length) {
                    var a = host_http + "get_ads.php";
                    t.zones = t.zones.join("|"),
                    t.loc = d.location.href,
                    t.ip = d.ip,
                    t.iframe = t.iframe.join("|"),
                    d.referrer && (t.referer = d.referrer);
                    var r = document.createElement("span");
                    e[1] = e[1].appendChild(r),
                    e[1] && e[1].parentNode.removeChild(e[1]);
                    var n = document.createElement("script");
                    n.src = a + "?ip=" + f.GetQueryString("ip") + "&" + f.encode(t).join("&"),
                    n.type = "text/javascript",
                    document.getElementsByTagName("head")[0].appendChild(n)
                }
            },
            detect: function() {
                for (var e = d.querySelectorAll("ins[data-" + f.name + "-id='" + a + "']"), t = {
                    zones: [],
                    iframe: [],
                    prefix: f.name + "-" + f.id + "-"
                },
                r = 0; r < e.length; r++) {
                    var n = e[r],
                    i = n;
                    if (n.hasAttribute("data-" + f.name + "-zoneid")) for (var o = new RegExp("^data-" + f.name + "-(.*)$"), c = 0; c < n.attributes.length; c++)(s = n.attributes[c].name.match(o)) && ("zoneid" == s[1] ? (t.zones[r] = n.attributes[c].value, n.id = t.prefix + r) : "id" != s[1] && (t[s[1]] = n.attributes[c].value));
                    if (i.hasAttribute("iframe")) {
                        var s, l = new RegExp("iframe");
                        for (c = 0; c < i.attributes.length; c++)(s = i.attributes[c].name.match(l)) && "iframe" == s && (t.iframe[r] = i.attributes[c].value)
                    } else t.iframe[r] = "false"
                }
                var u = new Array;
                return u[0] = t,
                u[1] = n,
                u
            },
            createFrame: function(e) {
                var t = d.createElement("IFRAME"),
                a = t.style;
                return t.scrolling = "no",
                t.frameBorder = 0,
                t.width = 0 < e.width ? e.width: 0,
                t.height = 0 < e.height ? e.height: 0,
                a.border = 0,
                a.overflow = "hidden",
                t
            },
            loadFrame: function(e, t) {
                var a = e.contentDocument || e.contentWindow.document;
                a.open(),
                a.writeln("<!DOCTYPE html>"),
                a.writeln("<html>"),
                a.writeln('<head><base target="_top"></head>'),
                a.writeln('<body border="0" margin="0" style="margin: 0; padding: 0">'),
                a.writeln(t),
                a.writeln("</body>"),
                a.writeln("</html>"),
                a.close()
            },
            spc: function(e) {
                for (var t in e) if (e.hasOwnProperty(t)) {
                    var a = e[t],
                    r = d.getElementById(t);
                    if (a.html && r) {
                        var n = d.createElement("div"),
                        i = a.width,
                        o = a.height;
                        n.style.width = i + "px",
                        n.style.height = o + "px",
                        n.setAttribute("class", "J_adv"),
                        n.setAttribute("data-view", a.data_view),
                        n.setAttribute("data-mod", "ad_popu_" + a.data_aid),
                        n.setAttribute("data-mtp", a.data_mod),
                        n.setAttribute("data-order", a.data_order),
                        a.hasOwnProperty("data_swapimg") && n.setAttribute("data-swapimg", a.data_swapimg);
                        var c = {
                            data: {}
                        },
                        s = d.referrer || "-";
                        if (c.data.ref = s, c.data.mtp = a.data_mod, c.data.mod = "ad_popu_" + a.data_aid, c.data.con = "ad_content_" + a.data_ideaid + ",ad_order_" + a.data_order, f.sendData(c, ""), n.setAttribute("data-con", "ad_content_" + a.data_ideaid), n.setAttribute("class", "J_adv"), a.iframeFriendly) {
                            var l = f.createFrame(a);
                            n.appendChild(l),
                            r.parentNode.replaceChild(n, r),
                            f.loadFrame(l, a.html)
                        } else {
                            n.innerHTML = a.html;
                            var u = n.getElementsByTagName("SCRIPT");
                            for (l = 0; l < u.length; l++) {
                                var m = document.createElement("SCRIPT"),
                                p = u[l].attributes;
                                for (o = 0; o < p.length; o++) m[p[o].nodeName] = p[o].value;
                                u[l].innerHTML && (m.text = u[l].innerHTML),
                                n.replaceChild(m, u[l])
                            }
                            r.parentNode.replaceChild(n, r)
                        }
                    }
                }
                f.isExitsFunction("CSDN.track.addAdvs") && CSDN.track.addAdvs()
            },
            isExitsFunction: function(funcName) {
                try {
                    if ("function" == typeof eval(funcName)) return ! 0
                } catch(e) {}
                return ! 1
            },
            GetQueryString: function(e) {
                var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
                a = window.location.search.substr(1).match(t);
                return null != a ? unescape(a[2]) : null
            },
            getUserId: function() {
                var e = /(; )?(UserName|_javaeye_cookie_id_)=([^;]+)/.exec(d.cookie);
                return (null != e ? e[3] : void 0) || "-"
            },
            sendData: function(e, t) {
                e.data.uid = f.getUserId(),
                e.data.ck = "-",
                csdn.trackReport("re", $.param(e.data))
            },
            paramData: function(e) {
                var t = [];
                for (var a in e) {
                    var r = a + "=" + e[a];
                    r.replace(/^\s+|\s+$/g, ""),
                    t.push(r)
                }
                return t.join("&")
            }
        };
        try {
            f.start()
        } catch(e) {
            console.log(e)
        }
    }
} (document, window);