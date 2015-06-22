# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150617171527) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.string   "instance_uuid", limit: 255
    t.text     "content"
    t.string   "username",      limit: 255
    t.string   "fullname",      limit: 255
    t.string   "org",           limit: 255
    t.datetime "created_at",                null: false
    t.datetime "updated_at",                null: false
    t.string   "uuid",          limit: 255
  end

  create_table "families", force: :cascade do |t|
    t.string   "name",             limit: 255
    t.text     "description"
    t.integer  "family_status_id"
    t.integer  "family_type_id"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "uuid",             limit: 255
  end

  add_index "families", ["family_status_id"], name: "index_families_on_family_status_id", using: :btree
  add_index "families", ["family_type_id"], name: "index_families_on_family_type_id", using: :btree

  create_table "family_memberships", force: :cascade do |t|
    t.integer  "family_id"
    t.integer  "organization_id"
    t.integer  "family_relationship_id"
    t.datetime "effective_date"
    t.datetime "expiration_date"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.string   "uuid",                   limit: 255
  end

  add_index "family_memberships", ["family_id"], name: "index_family_memberships_on_family_id", using: :btree
  add_index "family_memberships", ["family_relationship_id"], name: "index_family_memberships_on_family_relationship_id", using: :btree
  add_index "family_memberships", ["organization_id"], name: "index_family_memberships_on_organization_id", using: :btree

  create_table "family_relationships", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "uuid",       limit: 255
  end

  create_table "family_statuses", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "uuid",       limit: 255
  end

  create_table "family_types", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "uuid",       limit: 255
  end

  create_table "name_aliases", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.integer  "organization_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "uuid",            limit: 255
  end

  add_index "name_aliases", ["organization_id"], name: "index_name_aliases_on_organization_id", using: :btree

  create_table "organizations", force: :cascade do |t|
    t.integer  "po_id",             limit: 8
    t.string   "source_id",         limit: 255
    t.string   "name",              limit: 255
    t.string   "address",           limit: 255
    t.string   "address2",          limit: 255
    t.string   "city",              limit: 255
    t.string   "state_province",    limit: 255
    t.string   "postal_code",       limit: 255
    t.string   "country",           limit: 255
    t.string   "email",             limit: 255
    t.string   "phone",             limit: 255
    t.string   "fax",               limit: 255
    t.integer  "source_status_id"
    t.integer  "source_context_id"
    t.integer  "source_cluster_id"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "uuid",              limit: 255
  end

  add_index "organizations", ["source_cluster_id"], name: "index_organizations_on_source_cluster_id", using: :btree
  add_index "organizations", ["source_context_id"], name: "index_organizations_on_source_context_id", using: :btree
  add_index "organizations", ["source_status_id"], name: "index_organizations_on_source_status_id", using: :btree

  create_table "source_clusters", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "uuid",       limit: 255
  end

  create_table "source_contexts", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "uuid",       limit: 255
  end

  create_table "source_statuses", force: :cascade do |t|
    t.string   "code",       limit: 255
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "uuid",       limit: 255
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.integer  "failed_attempts",        default: 0,  null: false
    t.string   "unlock_token"
    t.datetime "locked_at"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["unlock_token"], name: "index_users_on_unlock_token", unique: true, using: :btree

  create_table "versions", force: :cascade do |t|
    t.string   "item_type",      null: false
    t.integer  "item_id",        null: false
    t.string   "event",          null: false
    t.string   "whodunnit"
    t.text     "object"
    t.datetime "created_at"
    t.text     "object_changes"
  end

  add_index "versions", ["item_type", "item_id"], name: "index_versions_on_item_type_and_item_id", using: :btree

  add_foreign_key "families", "family_statuses"
  add_foreign_key "families", "family_types"
  add_foreign_key "family_memberships", "families"
  add_foreign_key "family_memberships", "family_relationships"
  add_foreign_key "family_memberships", "organizations"
  add_foreign_key "name_aliases", "organizations"
  add_foreign_key "organizations", "source_clusters"
  add_foreign_key "organizations", "source_contexts"
  add_foreign_key "organizations", "source_statuses"
end
