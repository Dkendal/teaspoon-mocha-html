import * as JsDiff from 'diff';

window.Teaspoon.Reporters.HTML.FailureView.prototype.build = function() {
  window.Teaspoon.Reporters.HTML.FailureView.__super__.build.call(this, 'spec');

  function formatJson(error) {
    const diff = JsDiff.diffJson(error.expected, error.actual);

    return diff.map((part) => {
      const color = part.added ? 'green' : part.removed ? 'red' : 'grey';
      const span = document.createElement('span');
      span.style.color = color;
      span.style.background = 'initial';
      span.style.display = 'inline';
      span.style.lineheight = '1em';
      span.appendChild(document.createTextNode(part.value));
      return span;
    });
  }

  const container = document.createElement('div');

  this.spec.errors().forEach((error) => {
    console.error(error)

    const div = document.createElement('div');

    const header = document.createElement('h1');

    const headerText = document.createTextNode(this.spec.fullDescription);

    const headerLink = document.createElement('a')

    headerLink.href = this.spec.link

    header.classList.add('teaspoon-clearfix')

    headerLink.appendChild(headerText)

    header.appendChild(headerLink)

    this.el.appendChild(header);

    const msg = document.createElement('div')

    msg.appendChild(document.createTextNode(error.message, error))

    div.appendChild(msg);

    if (error.showDiff) {
      formatJson(error).map(x => div.appendChild(x));
    }

    container.appendChild(div);
  });

  this.el.appendChild(container);
};
