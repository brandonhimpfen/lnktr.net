module Jekyll
  class ButtonTag < Liquid::Block

    def render(context)
      text = super.strip
      lines = text.split("\n").map(&:strip)

      buttons = []
      lines.each_slice(3) do |label, url, style|
        buttons << "<a href=\"#{url}\" class=\"btn btn-#{style} btn-lg btn-block\">#{label}</a>"
      end

      buttons.join("\n")
    end
  end
end

Liquid::Template.register_tag('buttons', Jekyll::ButtonTag)
