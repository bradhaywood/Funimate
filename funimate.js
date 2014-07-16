(function(c) {
    var funimate = {
        getObjectById: function(id) {
            return c.querySelector('#' + id);
        },
        
        getObjectByClass: function(klass) {
            return c.querySelectorAll('.' + klass);

        },
        
        _hide: function(obj, s) {
            if (!s)
                s = 1000;
            obj._savedHeight = obj.clientHeight;
            obj.style.transition = 'opacity ' + (s/1000) + 's ease-in-out';
            obj.style.opacity = 0;
            setTimeout(function() { obj.style.visibility = 'hidden'; }, s);

            return obj;
        },

        _show: function(obj, s) {
            if (!s)
                s = 1000;
            obj.style.transition = 'opacity ' + (s/1000) + 's ease-in-out';
            obj.style.height = obj._savedHeight;
            obj.style.visibility = 'visible';
            obj.style.opacity = 1;
        },

        __getSupportedPropertyName: function(properties) {
            for (var i = 0; i < properties.length; i++) {
                if (typeof document.body.style[properties[i]] != "undefined") {
                    return properties[i];
                }
            }
            
            return null;
        },

        _move: function(obj, x, y, z, t) {

            z = '0px';
            var transform = ["transform", "msTransform", "webkitTransform", "mozTransform", "oTransform"];
            var transformProperty = funimate.__getSupportedPropertyName(transform);
            
            if (transformProperty) {
                if (t)
                    obj.style.transition = 'all ' + (t/1000) + 's ease-in-out';

                obj.style[transformProperty] = 'translate3d(' + x + ',' +  y + ',' +  z + ')';
                
                setTimeout(function() { obj.style.transition = ''; }, t);
            }
        },
        
        _fontsize: function(obj, s, t) {
            if (!t)
                t = 1000;
            obj.style.transition = 'all ' + (t/1000) + 's ease-in-out';
            obj.style.fontSize = s + 'px';
            setTimeout(function() { obj.style.transition = ''; }, t);
        },
    
        after: function(t, fn) {
            setTimeout(fn, t);
        }
    };

    window.funimate = funimate;
})(document);

  
Object.prototype.anim = function(action, x, y, z, t) {
    switch (action) {
        case 'hide':
            funimate._hide(this, x);
            break;
        case 'show':
            funimate._show(this, y);
            break;
        case 'move':
            funimate._move(this, x, y, z, t);
            break;
        case 'fontSize':
            funimate._fontsize(this, x, y);
            break;
        default:
            console.error("Unknown animation type: %s", action);
            break;
    }  

    return this;
};
