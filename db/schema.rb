# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_06_02_234628) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "portfolios", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "client_id"
    t.index ["client_id"], name: "index_portfolios_on_client_id"
    t.index ["user_id"], name: "index_portfolios_on_user_id"
  end

  create_table "positions", force: :cascade do |t|
    t.bigint "portfolio_id", null: false
    t.bigint "stock_id", null: false
    t.integer "quantity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["portfolio_id"], name: "index_positions_on_portfolio_id"
    t.index ["stock_id"], name: "index_positions_on_stock_id"
  end

  create_table "prices", force: :cascade do |t|
    t.bigint "stock_id", null: false
    t.string "symbol"
    t.date "date"
    t.float "open"
    t.float "high"
    t.float "low"
    t.float "close"
    t.integer "volume"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["stock_id"], name: "index_prices_on_stock_id"
  end

  create_table "stocks", force: :cascade do |t|
    t.string "symbol"
    t.string "name"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "role", default: 0
  end

  add_foreign_key "portfolios", "users"
  add_foreign_key "portfolios", "users", column: "client_id"
  add_foreign_key "positions", "portfolios"
  add_foreign_key "positions", "stocks"
  add_foreign_key "prices", "stocks"
end
