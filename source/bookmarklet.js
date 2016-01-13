(function(window, undefined){
  var TicketBookmarklet = {
    build: function() {
      var container = document.createElement('div'),
          iframe = document.createElement('iframe')

      container.id = "ticket-bookmarklet"

      iframe.src = this.host + "/index.html"

      container.appendChild(iframe)

      this.elements.container = container
      this.elements.iframe = iframe
      this.elements.stylesheet = this.stylesheet()

      this.hide()

      document.body.appendChild(container)
      document.body.appendChild(this.stylesheet())
    },

    hide: function() {
      this.elements.container.style.marginRight = "-" + this.width + "px"
      this.visible = false
    },

    load: function(){
      if(this._loaded) return false

      this.elements = {}

      this.host = "http://" + HOST
      this.speed = "0.35s"
      this.visible = false
      this.width = 350

      this.build()

      this._loaded = true
    },

    show: function() {
      this.elements.container.style.marginRight = "0px"
      this.visible = true
    },

    stylesheet: function() {
      var element = document.createElement('style')

      element.media = "screen"
      element.type = "text/css"

      element.innerHTML = "#ticket-bookmarklet {\
position:fixed;\
top:0;\
right:0;\
bottom:0;\
max-width:" + this.width + "px;\
width:100%;\
height:100%;\
border-left:1px solid #d2d2d2;\
box-shadow:0 0 25px rgba(0,0,0,0.25);\
-moz-transition:margin-right " + this.speed + " ease-in-out;\
-webkit-transition:margin-right " + this.speed + " ease-in-out;\
transition:margin-right " + this.speed + " ease-in-out;\
}\
#ticket-bookmarklet iframe {\
position:absolute;\
width:100%;\
height:100%;\
border:none;\
}"

      return element
    },

    toggle: function() {
      this.visible ? this.hide() : this.show()
    }
  }

  window.TicketBookmarklet = window.TicketBookmarklet || TicketBookmarklet

  window.TicketBookmarklet.load()
})(window, null)
