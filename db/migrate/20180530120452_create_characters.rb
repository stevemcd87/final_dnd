class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
       t.string :race
       t.string :job
       t.integer :cha
       t.integer :str
       t.integer :dex
       t.integer :con
       t.integer :int
       t.integer :wis
       t.integer :hp
       t.integer :speed
      t.timestamps
    end
  end
end
