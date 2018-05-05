(function ($) {
  var quips = [
    'Get married',
    'Are really excited about filing jointly',
    'Lowered expectations, increased ABV',
    'Totally aren\'t being forced to do this',
    'Pug tested, Cody approved',
    'Sponsored by...beer?',
    'What\'s next? Cats marrying dogs?',
    'Are both Cody\'s real dad',
    'And you thought you\'d seen everything',
    'Ruin marriage for the rest of us',
    'Remember to tip your bartender!',
    'Are you still reading these? It restarts after this one'
  ]
  var goingStatus = {
    yes: 'Yay! See you there!',
    no: 'Aww! No worries - we\'ll catch up soon!'
  }
  var len = quips.length
  var max = len * 10
  var slow = 3000

  function main (el, idx) {
    el.text(quips[idx % len])
    el.fadeIn(slow, function () {
      el.fadeOut(slow, function () {
        main(el, idx >= max ? 0 : idx + 1)
      })
    })
  }

  $(function () {
    var $main = $('#main-wrapper')
    var $rsvp = $('#rsvp')
    var $rsvpForm = $('#rsvp-form')
    var $back = $('.back-btn')
    var $form = $('form')
    var $email = $('#email')
    var $party = $('#party')
    var $yesGoing = $('#yes-going')
    var $yesRadio = $yesGoing.children('input')
    var $noGoing = $('#no-going')
    var $noRadio = $noGoing.children('input')
    var $submit = $('#submit')
    var $going = $('#going')
    var $goingMessage = $('#going-message')
    function formValid () {
      return $email.val() && $party.val()
    }
    $rsvp.on('click', function () {
      $main.fadeOut(function () {
        window.scrollTo(0, 0)
        $rsvpForm.fadeIn()
      })
    })
    $back.on('click', function () {
      $going.fadeOut()
      $rsvpForm.fadeOut(function () {
        $main.fadeIn()
      })
    })
    $yesGoing.on('click', function () {
      $yesRadio.prop('checked', true)
      $yesGoing.addClass('yes-going')
      $noRadio.prop('checked', false)
      $noGoing.removeClass('no-going')
    })
    $noGoing.on('click', function () {
      $yesRadio.prop('checked', false)
      $yesGoing.removeClass('yes-going')
      $noRadio.prop('checked', true)
      $noGoing.addClass('no-going')
    })
    $form.on('change', function (evt) {
      formValid() ? $submit.removeClass('disabled') : $submit.addClass('disabled')
    })
    $submit.on('click', function () {
      if (!formValid()) return
      var data = $form.serializeArray()
      $.post('/rsvp', data)
        .then(function () {
          $goingMessage.text(goingStatus[data[2].value])
          $rsvpForm.fadeOut(function () {
            $going.fadeIn()
          })
        })
        .catch(function () {
          $goingMessage.text('Oh man, something went wrong. Computers, am I right? Please try again, if you don\'t mind. If it still doesn\'t work, please email us directly!')
          $rsvpForm.fadeOut(function () {
            $going.fadeIn()
          })
        })
    })
    main($('#fader'), 0)
  })
})(window.$)
