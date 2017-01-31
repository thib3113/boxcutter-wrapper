var exports = module.exports = {};

var fs = require("fs");
var os = require("os");
var spawn = require('child_process').spawn;
var util = require('util');
var path = require('path');

function generateNewName(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 *
 * the object
 *
 * @param pOptions
 * @returns {BoxCutter}
 */
var BoxCutter = function (pOptions) {
    if (!(this instanceof BoxCutter))
        return new BoxCutter(pOptions);

    this.setOptions = function (pOptions) {
        this.options = {
            //delimite a rectangle for screen
            X1: pOptions.X1 || null,
            Y1: pOptions.Y1 || null,
            X2: pOptions.X2 || null,
            Y2: pOptions.Y2 || null,

            //don't support options and out a uncompress bmp, but fast
            fastMode: pOptions.fastMode || false,

            //take fullscreen screenshot
            fullscreen: pOptions.fullscreen || true,

            //format for output bmp and png supported
            outputFormat: pOptions.outputFormat || 'png'
        }
    };

    this.errors = [];

    this.setOptions(pOptions);

    this.shot = function (cb) {
        var options = this.options;
        var softOptions = [];
        if (options.X1 != null && options.Y1 != null && options.X2 != null && options.Y2 != null) {
            softOptions.push('-c');
            softOptions.push(util.format('%s,%s,%s,%s', options.X1, options.Y1, options.X2, options.Y2));
        }
        else if (options.fullscreen) {
            softOptions.push('-f');
        }

        this._filePath = path.join(os.tmpdir(), generateNewName(20) + "." + options.outputFormat);

        softOptions.push(this._filePath);
        var soft = spawn(path.join(__dirname, 'boxcutter', "boxcutter" + (options.fastMode ? "-fs" : "") + ".exe"), softOptions, {
            cwd: path.join(__dirname, 'boxcutter')
        });

        soft.stderr.on('data', function (data) {
            this.errors.push(data);
        }.bind(this));

        soft.on('close', function (code) {
            if (code === 0) {
                cb(null, this._filePath);
            }
            else {
                cb(this.errors, null);
            }
        }.bind(this));
    };

    Object.defineProperty(this, "X1", {
        get: function () {
            return this.options.X1;
        },
        set: function (value) {
            this.options.X1 = value;
        }
    });
    Object.defineProperty(this, "Y1", {
        get: function () {
            return this.options.Y1;
        },
        set: function (value) {
            this.options.Y1 = value;
        }
    });
    Object.defineProperty(this, "X2", {
        get: function () {
            return this.options.X2;
        },
        set: function (value) {
            this.options.X2 = value;
        }
    });
    Object.defineProperty(this, "Y2", {
        get: function () {
            return this.options.Y2;
        },
        set: function (value) {
            this.options.Y2 = value;
        }
    });
    Object.defineProperty(this, "fastMode", {
        get: function () {
            return this.options.fastMode;
        },
        set: function (value) {
            this.options.fastMode = value;
        }
    });
    Object.defineProperty(this, "fullscreen", {
        get: function () {
            return this.options.fullscreen;
        },
        set: function (value) {
            this.options.fullscreen = value;
        }
    });
    Object.defineProperty(this, "outputFormat", {
        get: function () {
            return this.options.outputFormat;
        },
        set: function (value) {
            this.options.outputFormat = value;
        }
    });

};

module.exports = BoxCutter;