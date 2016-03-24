class RenameLinkColumn < ActiveRecord::Migration
  def change
    rename_column :posts, :link, :content
  end
end
