/**
 * Created by singhs10 on 7/31/15.
 */

/**
 * Usage: wait(element, label)
 * element : It will wait for this element to come into view
 * label : just used for the error message
 */

exports.wait = function (element, label) {
    browser.wait(function () {
        return element.isPresent().then(function (state) {
            if (state == true) {
                return element.isDisplayed().then(function (state2) {
                    return state2 == true;
                });
            } else {
                return false;
            }
        });
    }, 10000, label + " did not appear");
    browser.sleep(250);
};
