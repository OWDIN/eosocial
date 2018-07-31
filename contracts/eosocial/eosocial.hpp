#include <string>
#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
#include <eosiolib/action.hpp>

using namespace eosio;
using namespace std;

class eosocial : public contract {
public:
    eosocial(account_name self) : contract(self) {}

    void debug();
    void write(const account_name author, const string content);
    void update(const uint64_t post_id, const account_name author, const string content);
    void remove(const uint64_t post_id);
    void vote(const uint64_t post_id, const account_name voter, const string type);
    void removevote(const uint64_t id);

private:
    static uint64_t id;

    struct post_id {
        post_id() {}
        constexpr static uint64_t key = N(post_id);
        uint64_t id = 1;
    };

    struct vote_id {
        vote_id() {}
        constexpr static uint64_t key = N(vote_id);
        uint64_t id = 1;
    };

    bool get_post_id(post_id &data) {
        auto iter = db_find_i64(_self, _self, N(post_id), post_id::key);

        if (iter != -1) {
            auto size = db_get_i64(iter, (char *)&data, sizeof(post_id));
            eosio_assert(size == sizeof(post_id), "Invalid post id.");
            return true;
        }

        return false;
    }

    bool get_vote_id(vote_id &data) {
        auto iter = db_find_i64(_self, _self, N(vote_id), vote_id::key);

        if (iter != -1) {
            auto size = db_get_i64(iter, (char *)&data, sizeof(vote_id));
            eosio_assert(size == sizeof(vote_id), "Invalid vote id.");
            return true;
        }

        return false;
    }

    void set_post_id(const post_id &data) {
        auto iter = db_find_i64(_self, _self, N(post_id), post_id::key);

        if (iter != -1) {
            db_update_i64(iter, _self, (const char *)&data, sizeof(post_id));
        } else {
            db_store_i64(_self, N(post_id), _self, post_id::key, (const char *)&data, sizeof(post_id));
        }
    }

    void set_vote_id(const vote_id &data) {
        auto iter = db_find_i64(_self, _self, N(vote_id), vote_id::key);

        if (iter != -1) {
            db_update_i64(iter, _self, (const char *)&data, sizeof(vote_id));
        } else {
            db_store_i64(_self, N(vote_id), _self, vote_id::key, (const char *)&data, sizeof(vote_id));
        }
    }

    // @abi table posts i64
    struct post {
        uint64_t id;
        string content;
        account_name author;
        time created_at;
        time updated_at;

        uint64_t primary_key() const { return id; }
        account_name by_account() const { return author; }

        EOSLIB_SERIALIZE(post, (id)(content)(author)(created_at)(updated_at))
    };
    typedef multi_index<N(posts), post,
        indexed_by< N(author),
            const_mem_fun<post, account_name, &post::by_account>
        >
    > post_table;

    // @abi table polls i64
    struct poll {
        uint64_t id;
        uint64_t post_id;
        account_name voter;
        string type;
        time voted_at;

        uint64_t primary_key() const { return id; }
        uint64_t by_post_id() const { return post_id; }

        EOSLIB_SERIALIZE(poll, (id)(post_id)(voter)(type)(voted_at))
    };
    typedef multi_index<N(polls), poll,
        indexed_by< N(post_id),
            const_mem_fun<poll, account_name, &poll::by_post_id>
        >
    > poll_table;
};

EOSIO_ABI(eosocial, (debug)(write)(update)(remove)(vote)(removevote))
